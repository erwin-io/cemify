import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/model/users';
import { PusherService } from 'src/app/services/pusher.service';
import { AccessPages } from 'src/app/model/access.model';
import { Reservation } from 'src/app/model/reservation.model';
import { MapBoxComponent } from 'src/app/shared/map-box/map-box.component';
@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
  host: {
    class: "page-component"
  }
})
export class ReservationDetailsComponent {
  currentUserProfile:Users;
  reservationCode;
  isReadOnly = true;
  error;
  isLoading = true;

  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  isLoadingRoles = false;

  @ViewChild('reservationForm', { static: true}) reservationForm: ReservationFormComponent;

  canAddEdit = false;

  reservation: Reservation;

  pageAccess: AccessPages = {
    view: true,
    modify: false,
  } as any;

  @ViewChild('mapBox') mapBox: MapBoxComponent;


  constructor(
    private reservationService: ReservationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private appconfig: AppConfigService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private pusherService: PusherService
  ) {
    this.currentUserProfile = this.storageService.getLoginProfile();
    const { isNew, edit } = this.route.snapshot.data;
    this.reservationCode = this.route.snapshot.paramMap.get('reservationCode');
    this.isReadOnly = !edit && !isNew;
    if (this.route.snapshot.data) {
      this.pageAccess = {
        ...this.pageAccess,
        ...this.route.snapshot.data['access'],
      };
    }
  }

  get pageRights() {
    let rights = {};
    for(var right of this.pageAccess.rights) {
      rights[right] = this.pageAccess.modify;
    }
    return rights;
  }

  ngOnInit(): void {
    const channel = this.pusherService.init(this.currentUserProfile.userId);
    channel.bind('reservationChanges', (res: Reservation) => {
      console.log(res);
      if(res.reservationId === this.reservation.reservationId) {
        this.snackBar.open("Someone has updated this document.", "",{
          announcementMessage: "Someone has updated this document.",
          verticalPosition: "top"
        });
        setTimeout(()=> {
          if(this.isReadOnly) {
            this.initDetails();
          }
        }, 3000);
      }
    });
  }

  async ngAfterViewInit() {
    // await Promise.all([
    // ])
    this.initDetails();
  }

  initDetails() {
    this.isLoading = true;
    try {
      this.reservationService.getByCode(this.reservationCode).subscribe(res=> {
        if (res.success) {
          this.reservation = res.data;
          this.reservationForm.setFormValue(this.reservation);

          if (this.isReadOnly) {
            this.reservationForm.form.disable();
          }
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(res.message) ? res.message[0] : res.message;
          this.snackBar.open(this.error, 'close', {
            panelClass: ['style-error'],
          });
          this.router.navigate(['/reservation/']);
        }
      });
    } catch(ex) {
      this.error = Array.isArray(ex.message) ? ex.message[0] : ex.message;
      this.snackBar.open(this.error, 'close', {
        panelClass: ['style-error'],
      });
      this.router.navigate(['/reservation/']);
      this.isLoading = false;
    }
  }

  updateStatus(status: "REJECTED"
  | "APPROVED"
  | "LEASED"
  | "CANCELLED") {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    if(status === "CANCELLED") {
      dialogData.message = 'Are you sure you want to cancel reservation?';
    } else if(status === "REJECTED") {
      dialogData.message = 'Are you sure you want to reject reservation?';
    } else if(status === "APPROVED") {
      dialogData.message = 'Are you sure you want to complete reservation?';
    }
    dialogData.confirmButton = {
      visible: true,
      text: 'yes',
      color: 'primary',
    };
    dialogData.dismissButton = {
      visible: true,
      text: 'cancel',
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: '400px',
      closeOnNavigation: true,
    });
    dialogRef.componentInstance.alertDialogConfig = dialogData;


    dialogRef.componentInstance.conFirm.subscribe(async (data: any) => {

      if(status === "LEASED") {
        this.dialog.closeAll();
        this.router.navigate(['/burial/' + this.reservationCode + '/from-reservation' ]);
      } else {
        this.isProcessing = true;
        dialogRef.componentInstance.isProcessing = this.isProcessing;
        try {
          let res = await this.reservationService.updateStatus(this.reservationCode, { status }).toPromise();
          if (res.success) {
            this.snackBar.open('Successfully updated!', 'close', {
              panelClass: ['style-success'],
            });
            this.router.navigate(['/reservation/' + this.reservationCode + '/details']);
            this.isProcessing = false;
            dialogRef.componentInstance.isProcessing = this.isProcessing;
            await this.ngAfterViewInit();
            dialogRef.close();
            this.dialog.closeAll();
          } else {
            this.isProcessing = false;
            dialogRef.componentInstance.isProcessing = this.isProcessing;
            this.error = Array.isArray(res.message)
              ? res.message[0]
              : res.message;
            this.snackBar.open(this.error, 'close', {
              panelClass: ['style-error'],
            });
            dialogRef.close();
          }
        } catch (e) {
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          this.error = Array.isArray(e.message) ? e.message[0] : e.message;
          this.snackBar.open(this.error, 'close', {
            panelClass: ['style-error'],
          });
          dialogRef.close();
        }
      }
    });
  }

  onLoadComplete() {
    const { mapData, lotCode, block } = this.reservation?.lot;
    const { zoom, pan } = mapData;
    // this.mapBox.setZoom(Number(zoom));
    this.mapBox.setPan(pan.x, pan.y);
    this.mapBox.selectLot(lotCode, block);
  }
}
