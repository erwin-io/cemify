import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { WorkOrderService } from 'src/app/services/work-order.service';
import { WorkOrderTableColumn } from 'src/app/shared/utility/table';
import { convertNotationToObject } from 'src/app/shared/utility/utility';
import { WorkOrderDetailsComponent } from './work-order-details/work-order-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config.service';
import { StorageService } from 'src/app/services/storage.service';
import { Title } from '@angular/platform-browser';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Users } from 'src/app/model/users';
import { PusherService } from 'src/app/services/pusher.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { Location } from '@angular/common';
import { Observable, Subject, catchError, of, takeUntil } from 'rxjs';
import { AccessPages } from 'src/app/model/access.model';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss'],
  host: {
    class: "page-component"
  }
})
export class WorkOrderComponent  {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  tabIndex = 0;
  currentUserProfile: Users;
  error:string;
  dataSource = {
    pending: new MatTableDataSource<any>([]),
    cancelled: new MatTableDataSource<any>([]),
    inprogress: new MatTableDataSource<any>([]),
    completed: new MatTableDataSource<any>([]),
  }
  displayedColumns = [];
  isLoading = false;
  isProcessing = false;
  pageIndex = {
    pending: 0,
    cancelled: 0,
    inprogress: 0,
    completed: 0,
  };
  pageSize = {
    pending: 10,
    cancelled: 10,
    inprogress: 10,
    completed: 10,
  };
  total = {
    pending: 0,
    cancelled: 0,
    inprogress: 0,
    completed: 0,
  };
  order = {
    pending: { workOrderId: "DESC" },
    cancelled: { workOrderId: "DESC" },
    inprogress: { workOrderId: "DESC" },
    completed: { workOrderId: "DESC" }
  };

  filter = {
    pending: [] as {
      apiNotation: string;
      filter: string;
      name: string;
      type: string;
    }[],
    cancelled: [] as {
      apiNotation: string;
      filter: string;
      name: string;
      type: string;
    }[],
    inprogress: [] as {
      apiNotation: string;
      filter: string;
      name: string;
      type: string;
    }[],
    completed: [] as {
      apiNotation: string;
      filter: string;
      name: string;
      type: string;
    }[]
  };
  pageAccess: AccessPages = {
    view: true,
    modify: false,
    rights: []
  };

  @ViewChild('workOrderFormDialog') workOrderFormDialogTemp: TemplateRef<any>;
  constructor(
    private elementRef: ElementRef,
    private spinner: SpinnerVisibilityService,
    private workOrderService: WorkOrderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public appConfig: AppConfigService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private titleService: Title,
    private _location: Location,
    public router: Router,
    private pusherService: PusherService) {
      this.currentUserProfile = this.storageService.getLoginProfile();
      this.tabIndex = this.route.snapshot.data["tab"];
      if(this.route.snapshot.data) {
        this.pageAccess = {
          ...this.pageAccess,
          ...this.route.snapshot.data["access"]
        };
      }
      this.onSelectedTabChange({index: this.tabIndex}, false);
    }


  get pageRights() {
    let rights = {};
    for(var right of this.pageAccess.rights) {
      rights[right] = this.pageAccess.modify;
    }
    return rights;
  }

  ngOnInit(): void {
    const channel = this.pusherService.init("all");
    channel.bind("reSync", (res: any) => {
      const { type, data } = res;
      console.log(type);
      if(type && type === "WORK_ORDER") {
        setTimeout(()=> {
          this.getWorkOrderPaginated("pending", false);
          this.getWorkOrderPaginated("cancelled", false);
          this.getWorkOrderPaginated("inprogress", false);
          this.getWorkOrderPaginated("completed", false);
        }, 3000)
      }
    });
  }

  public ngOnDestroy(): void {
      // This aborts all HTTP requests.
      this.ngUnsubscribe.next();
      // This completes the subject properlly.
      this.ngUnsubscribe.complete();
  }

  ngAfterViewInit() {
    this.getWorkOrderPaginated("pending");
    this.getWorkOrderPaginated("cancelled");
    this.getWorkOrderPaginated("inprogress");
    this.getWorkOrderPaginated("completed");

  }

  filterChange(event: {
    apiNotation: string;
    filter: string;
    name: string;
    type: string;
  }[], table: string) {
    this.filter[table] = event;
    this.getWorkOrderPaginated(table as any);
  }

  async pageChange(event: { pageIndex: number, pageSize: number }, table: string) {
    this.pageIndex[table] = event.pageIndex;
    this.pageSize[table] = event.pageSize;
    await this.getWorkOrderPaginated(table as any);
  }

  async sortChange(event: { active: string, direction: string }, table: string) {
    const { active, direction } = event;
    const { apiNotation } = this.appConfig.config.tableColumns.workOrder.find(x=>x.name === active);
    this.order[table] = convertNotationToObject(apiNotation, direction === "" ? "ASC" : direction.toUpperCase());
    this.getWorkOrderPaginated(table as any)
  }

  async getWorkOrderPaginated(table: "pending" | "cancelled" | "inprogress" | "completed", showProgress = true){
    try{
      let findIndex = this.filter[table].findIndex(x=>x.apiNotation === "status");
      if(findIndex >= 0) {
        this.filter[table][findIndex] = {
          "apiNotation": "status",
          "filter": table.toUpperCase(),
          "name": "status",
          "type": "text"
        };
      } else {
        this.filter[table].push({
          "apiNotation": "status",
          "filter": table.toUpperCase(),
          "name": "status",
          "type": "text"
        });
      }

      if(!this.pageRights['Status']) {
        findIndex = this.filter[table].findIndex(x=>x.apiNotation === "assignedStaffUser.userCode");
        if(findIndex >= 0) {
          this.filter[table][findIndex] = {
            "apiNotation": "assignedStaffUser.userCode",
            "filter": this.currentUserProfile?.userCode,
            "name": "assignedStaffUser",
            "type": "precise"
          };
        } else {
          this.filter[table].push({
            "apiNotation": "assignedStaffUser.userCode",
            "filter": this.currentUserProfile?.userCode,
            "name": "assignedStaffUser",
            "type": "precise"
          });
        }
      }

      this.isLoading = true;
      if(showProgress === true) {
        this.spinner.show();
      }
      await this.workOrderService.getByAdvanceSearch({
        order: this.order[table],
        columnDef: this.filter[table],
        pageIndex: this.pageIndex[table],
        pageSize: this.pageSize[table]
      }).pipe(
        takeUntil(this.ngUnsubscribe),
        catchError(this.handleError('workOrder', []))
      )
      .subscribe(async res => {
        if(res.success){
          let data = res.data.results.map((d)=>{
            return {
              workOrderCode: d.workOrderCode,
              dateTargetCompletion: d.dateTargetCompletion.toString(),
              type: d.type,
              title: d.title,
              description: d.description,
              assignedStaffUser: d.assignedStaffUser?.fullName,
              status: d.status,
              url: `/work-order/${d.workOrderCode}/details`,
            } as WorkOrderTableColumn
          });
          this.total[table] = res.data.total;
          this.dataSource[table] = new MatTableDataSource(data);
          this.isLoading = false;
          this.spinner.hide();
        }
        else{
          this.error = Array.isArray(res.message) ? res.message[0] : res.message;
          this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
          this.isLoading = false;
          this.spinner.hide();
        }
      }, async (err) => {
        this.error = Array.isArray(err.message) ? err.message[0] : err.message;
        this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
        this.isLoading = false;
        this.spinner.hide();
      });
    }
    catch(e){
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
      this.isLoading = false;
      this.spinner.hide();
    }

  }

  showAddDialog() {
    this.dialog.open(this.workOrderFormDialogTemp)
  }

  onSelectedTabChange({ index }, redirect = true) {
    if(index === 1) {
      if(redirect) {
        this._location.go("/work-order/inprogress");
      }
      this.titleService.setTitle(`Inprogress | ${this.appConfig.config.appName}`);
    } else if(index === 2) {
      if(redirect) {
        this._location.go("/work-order/completed");
      }
      this.titleService.setTitle(`Completed | ${this.appConfig.config.appName}`);
    } else if(index === 3) {
      if(redirect) {
        this._location.go("/work-order/cancelled");
      }
      this.titleService.setTitle(`Cancelled | ${this.appConfig.config.appName}`);
    } else {
      if(redirect) {
        this._location.go("/work-order/pending");
      }
      this.titleService.setTitle(`Pending | ${this.appConfig.config.appName}`);
    }
  }
  onAnimationDone(): void {
    const inactiveTabs = this.elementRef.nativeElement.querySelectorAll(
        '.mat-mdc-tab-body-active .mat-mdc-tab-body-content > mat-card:not(:first-child)'
    );

    console.log(inactiveTabs);
    inactiveTabs.forEach(tab => tab.remove());
  }

  handleError<T>(operation = 'operation', result?: any) {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    return (error: any): Observable<any> => {
      return of(error.error as any);
    };
  }
}
