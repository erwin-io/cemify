import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationTableColumn } from 'src/app/shared/utility/table';
import { convertNotationToObject } from 'src/app/shared/utility/utility';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
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
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  host: {
    class: "page-component"
  }
})
export class ReservationComponent  {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  tabIndex = 0;
  currentUserProfile: Users;
  error:string;
  dataSource = {
    pending: new MatTableDataSource<any>([]),
    approved: new MatTableDataSource<any>([]),
    leased: new MatTableDataSource<any>([]),
    rejected: new MatTableDataSource<any>([]),
    cancelled: new MatTableDataSource<any>([]),
  }
  displayedColumns = [];
  isLoading = false;
  isProcessing = false;
  pageIndex = {
    pending: 0,
    approved: 0,
    leased: 0,
    rejected: 0,
    cancelled: 0,
  };
  pageSize = {
    pending: 10,
    approved: 10,
    leased: 10,
    rejected: 10,
    cancelled: 10,
  };
  total = {
    pending: 0,
    approved: 0,
    leased: 0,
    rejected: 0,
    cancelled: 0,
  };
  order = {
    pending: { reservationId: "ASC" },
    approved: { reservationId: "ASC" },
    leased: { reservationId: "DESC" },
    rejected: { reservationId: "DESC" },
    cancelled: { reservationId: "DESC" },
  };

  filter = {
    pending: [] as {
      apiNotation: string;
      filter: string;
      name: string;
      type: string;
    }[],
    approved: [] as {
      apiNotation: string;
      filter: string;
      name: string;
      type: string;
    }[],
    leased: [] as {
      apiNotation: string;
      filter: string;
      name: string;
      type: string;
    }[],
    rejected: [] as {
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
    }[]
  };
  pageAccess: AccessPages = {
    view: true,
    modify: false,
  };

  @ViewChild('reservationFormDialog') reservationFormDialogTemp: TemplateRef<any>;
  constructor(
    private elementRef: ElementRef,
    private spinner: SpinnerVisibilityService,
    private reservationService: ReservationService,
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
        // this.pageReservation = {
        //   ...this.pageReservation,
        //   ...this.route.snapshot.data["reservation"]
        // };
      }
      this.onSelectedTabChange({index: this.tabIndex}, false);
    }

  ngOnInit(): void {
    const channel = this.pusherService.init("all");
    channel.bind("reSync", (res: any) => {
      const { type, data } = res;
      console.log(type);
      if(type && type === "RESERVATION") {
        setTimeout(()=> {
          this.getReservationPaginated("pending", false);
          this.getReservationPaginated("approved", false);
          this.getReservationPaginated("leased", false);
          this.getReservationPaginated("rejected", false);
          this.getReservationPaginated("cancelled", false);
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
    this.getReservationPaginated("pending");
    this.getReservationPaginated("approved");
    this.getReservationPaginated("leased");
    this.getReservationPaginated("rejected");
    this.getReservationPaginated("cancelled");

  }

  filterChange(event: {
    apiNotation: string;
    filter: string;
    name: string;
    type: string;
  }[], table: string) {
    this.filter[table] = event;
    this.getReservationPaginated(table as any);
  }

  async pageChange(event: { pageIndex: number, pageSize: number }, table: string) {
    this.pageIndex[table] = event.pageIndex;
    this.pageSize[table] = event.pageSize;
    await this.getReservationPaginated(table as any);
  }

  async sortChange(event: { active: string, direction: string }, table: string) {
    const { active, direction } = event;
    const { apiNotation } = this.appConfig.config.tableColumns.reservation.find(x=>x.name === active);
    this.order[table] = convertNotationToObject(apiNotation, direction === "" ? "ASC" : direction.toUpperCase());
    this.getReservationPaginated(table as any)
  }

  async getReservationPaginated(table: "pending" | "approved" | "leased" | "rejected" | "cancelled", showProgress = true){
    try{
      const findIndex = this.filter[table].findIndex(x=>x.apiNotation === "status");
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

      this.isLoading = true;
      if(showProgress === true) {
        this.spinner.show();
      }
      await this.reservationService.getByAdvanceSearch({
        order: this.order[table],
        columnDef: this.filter[table],
        pageIndex: this.pageIndex[table],
        pageSize: this.pageSize[table]
      }).pipe(
        takeUntil(this.ngUnsubscribe),
        catchError(this.handleError('reservation', []))
      )
      .subscribe(async res => {
        if(res.success){
          let data = res.data.results.map((d)=>{
            return {
              reservationCode: d.reservationCode,
              dateTime: d.dateTime.toString(),
              dateOfBurial: d.dateOfBurial.toString(),
              block: d.lot?.block,
              lotCode: d.lot?.lotCode,
              user: d.user?.fullName,
              status: d.status,
              url: `/reservation/${d.reservationCode}/details`,
            } as ReservationTableColumn
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
    this.dialog.open(this.reservationFormDialogTemp)
  }

  onSelectedTabChange({ index }, redirect = true) {
    if(index === 1) {
      if(redirect) {
        this._location.go("/reservation/approved");
      }
      this.titleService.setTitle(`Approved | ${this.appConfig.config.appName}`);
    } else if(index === 2) {
      if(redirect) {
        this._location.go("/reservation/leased");
      }
      this.titleService.setTitle(`Leased | ${this.appConfig.config.appName}`);
    } else if(index === 3) {
      if(redirect) {
        this._location.go("/reservation/rejected");
      }
      this.titleService.setTitle(`Rejected | ${this.appConfig.config.appName}`);
    } else if(index === 4) {
      if(redirect) {
        this._location.go("/reservation/cancelled");
      }
      this.titleService.setTitle(`Cancelled | ${this.appConfig.config.appName}`);
    } else {
      if(redirect) {
        this._location.go("/reservation/pending");
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
