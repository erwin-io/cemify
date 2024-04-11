import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BurialService } from 'src/app/services/burial.service';
import { BurialTableColumn } from 'src/app/shared/utility/table';
import { convertNotationToObject } from 'src/app/shared/utility/utility';
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
import { Access, AccessPages } from 'src/app/model/access.model';

@Component({
  selector: 'app-burial',
  templateUrl: './burial.component.html',
  styleUrls: ['./burial.component.scss'],
  host: {
    class: "page-component"
  }
})
export class BurialComponent  {
  tabIndex = 0;
  currentUserProfile: Users;
  error:string;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = [];
  isLoading = false;
  isProcessing = false;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order = { burialId: "ASC" };

  filter: {
    apiNotation: string;
    filter: string;
    name: string;
    type: string;
  }[] = [];

  pageAccess: AccessPages = {
    view: true,
    modify: false,
  };

  @ViewChild('burialFormDialog') burialFormDialogTemp: TemplateRef<any>;
  constructor(
    private spinner: SpinnerVisibilityService,
    private burialService: BurialService,
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
      // console.log(this.currentUserProfile.access.find)
      if(this.route.snapshot.data) {
        this.pageAccess = {
          ...this.pageAccess,
          ...this.route.snapshot.data["access"]
        };
      }
    }

  ngOnInit(): void {
    const channel = this.pusherService.init("all");
    channel.bind("reSync", (res: any) => {
      const { type, data } = res;
      if(type && type === "BURIAL") {
        setTimeout(()=> {
          this.getBurialPaginated(false);
        }, 3000)
      }
    });
  }

  ngAfterViewInit() {
    this.getBurialPaginated();

  }

  filterChange(event: {
    apiNotation: string;
    filter: string;
    name: string;
    type: string;
  }[]) {
    this.filter = event;
    this.getBurialPaginated();
  }

  async pageChange(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.getBurialPaginated();
  }

  async sortChange(event: { active: string, direction: string }) {
    const { active, direction } = event;
    const { apiNotation } = this.appConfig.config.tableColumns.burial.find(x=>x.name === active);
    this.order = convertNotationToObject(apiNotation, direction === "" ? "ASC" : direction.toUpperCase());
    this.getBurialPaginated()
  }

  async getBurialPaginated(showProgress = true){
    try{
      const findIndex = this.filter.findIndex(x=>x.apiNotation === "active");
      if(findIndex >= 0) {
        this.filter[findIndex] = {
          "apiNotation": "active",
          "filter": "Yes",
          "name": "active",
          "type": "option-yes-no"
        };
      } else {
        this.filter.push({
          "apiNotation": "active",
          "filter": "Yes",
          "name": "active",
          "type": "option-yes-no"
        });
      }
      this.isLoading = true;
      if(showProgress === true) {
        this.spinner.show();
      }
      await this.burialService.getByAdvanceSearch({
        order: this.order,
        columnDef: this.filter,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      .subscribe(async res => {
        if(res.success){
          let data = res.data.results.map((d)=>{
            return {
              burialCode: d.burialCode,
              fullName: d.fullName,
              dateOfBurial: d.dateOfBurial.toString(),
              dateOfBirth: d.dateOfBirth.toString(),
              dateOfDeath: d.dateOfDeath.toString(),
              lotCode: d.lot?.lotCode,
              block: d.lot?.block,
              familyContactPerson: d.familyContactPerson,
              familyContactNumber: d.familyContactNumber,
              fromReservation: d.fromReservation ? "Yes" : "No",
              workOrder: d.workOrder?.status,
              url: `/burial/${d.burialCode}/details`,
            } as BurialTableColumn
          });
          this.total = res.data.total;
          this.dataSource = new MatTableDataSource(data);
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
    this.dialog.open(this.burialFormDialogTemp)
  }
}
