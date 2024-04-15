import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';
import { BurialService } from 'src/app/services/burial.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';
import { BurialFormComponent } from '../burial-form/burial-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/model/users';
import { PusherService } from 'src/app/services/pusher.service';
import { AccessPages } from 'src/app/model/access.model';
import { Burial } from 'src/app/model/burial.model';
import * as moment from 'moment';
import { Reservation } from 'src/app/model/reservation.model';
import { ApiResponse } from 'src/app/model/api-response.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { DateConstant } from 'src/app/constant/date';
import { MapBoxComponent } from 'src/app/shared/map-box/map-box.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-burial-details',
  templateUrl: './burial-details.component.html',
  styleUrls: ['./burial-details.component.scss'],
  host: {
    class: "page-component"
  }
})
export class BurialDetailsComponent {
  currentUserProfile:Users;
  burialCode;
  reservationCode;
  isNew = false;
  isReadOnly = true;
  error;
  isLoading = true;

  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  isLoadingRoles = false;


  @ViewChild('mapBox') mapBox: MapBoxComponent;
  @ViewChild('burialForm', { static: true}) burialForm: BurialFormComponent;

  canAddEdit = false;
  isNewFromReservation = false;

  burial: Burial;

  pageAccess: AccessPages = {
    view: true,
    modify: false,
  } as any;

  constructor(
    private burialService: BurialService,
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
    this.isNew = isNew;
    this.burialCode = this.route.snapshot.paramMap.get('burialCode');
    this.reservationCode = this.route.snapshot.paramMap.get('reservationCode');
    this.isReadOnly = edit || isNew ? false : !edit && !isNew && !this.reservationCode;
    if (this.route.snapshot.data) {
      this.pageAccess = {
        ...this.pageAccess,
        ...this.route.snapshot.data['access'],
      };
    }
    if(this.reservationCode && this.reservationCode !== "") {
      this.isNewFromReservation = true;
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
    channel.bind('burialChanges', (res: Burial) => {
      console.log(res);
      if(res.burialId === this.burial.burialId) {
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
    if(!this.isNew) {
      this.canAddEdit = !this.isReadOnly;
      this.initDetails();
    } else if(this.isNewFromReservation) {
      this.initBookingDetails();
      this.canAddEdit = true;
      this.isLoading = false;
    } else if(this.pageAccess.modify) {
      this.canAddEdit = true;
      this.isLoading = false;
    } else {
      this.router.navigate(['/burial/']);
    }
  }

  initDetails() {
    this.isLoading = true;
    try {
      this.burialService.getByCode(this.burialCode).subscribe(res=> {
        if (res.success) {
          this.burial = res.data;
          this.burialForm.setFormValue(this.burial);

          if (this.isReadOnly) {
            this.burialForm.form.disable();
          } else if(this.pageAccess.modify ? !this.isReadOnly && !this.burial.active : false) {
            this.router.navigate(['/burial/' + this.burialCode]);
          }
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(res.message) ? res.message[0] : res.message;
          this.snackBar.open(this.error, 'close', {
            panelClass: ['style-error'],
          });
          this.router.navigate(['/burial/']);
        }
      });
    } catch(ex) {
      this.error = Array.isArray(ex.message) ? ex.message[0] : ex.message;
      this.snackBar.open(this.error, 'close', {
        panelClass: ['style-error'],
      });
      this.router.navigate(['/burial/']);
      this.isLoading = false;
    }
  }

  initBookingDetails() {
    this.isLoading = true;
    try {
      this.reservationService.getByCode(this.reservationCode).subscribe((res: ApiResponse<Reservation>)=> {
        if (res.success && res.data) {

          this.burialForm.lot = res.data.lot;
          this.burialForm.form.controls["fullName"].setValue(res.data.burialName);
          this.burialForm.form.controls["dateOfBirth"].setValue(this.isReadOnly ? (res.data.dateOfBirth ? moment(res.data.dateOfBirth).format("MMMM DD, YYYY") : "") : res.data.dateOfBirth);
          this.burialForm.form.controls["dateOfDeath"].setValue(this.isReadOnly ? (res.data.dateOfDeath ? moment(res.data.dateOfDeath).format("MMMM DD, YYYY") : "") : res.data.dateOfDeath);
          this.burialForm.form.controls["dateOfBurial"].setValue(this.isReadOnly ? (res.data.dateOfBurial ? moment(res.data.dateOfBurial).format("MMMM DD, YYYY") : "") : res.data.dateOfBurial);
          this.burialForm.form.controls["block"].setValue(res.data.lot?.block && res.data.lot?.block ? res.data.lot?.block : "");
          this.burialForm.form.controls["lotCode"].setValue(res.data.lot?.lotCode && res.data.lot?.lotCode ? res.data.lot?.lotCode : "");
          this.burialForm.form.controls["familyContactPerson"].setValue(res.data.familyContactPerson);
          this.burialForm.form.controls["familyContactNumber"].setValue(res.data.familyContactNumber);
          if(!this.pageAccess.modify) {
            this.router.navigate(['/burial/' + this.burialCode]);
          }
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(res.message) ? res.message[0] : res.message;
          this.snackBar.open(this.error, 'close', {
            panelClass: ['style-error'],
          });
          this.router.navigate(['/burial/']);
        }
      });
    } catch(ex) {
      this.error = Array.isArray(ex.message) ? ex.message[0] : ex.message;
      this.snackBar.open(this.error, 'close', {
        panelClass: ['style-error'],
      });
      this.router.navigate(['/burial/']);
      this.isLoading = false;
    }
  }

  onSubmit() {
    const formData = this.burialForm?.getFormData;
    console.log(formData);
    if(!this.burialForm.valid) {
      this.burialForm.form.markAsDirty();
      this.burialForm.form.markAsTouched();
      this.burialForm.form.updateValueAndValidity();
      return;
    }
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Save burial?';
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
      this.isProcessing = true;
      dialogRef.componentInstance.isProcessing = this.isProcessing;
      try {
        let res;
        if(this.isNew) {
          if(this.isNewFromReservation) {
            res = await this.burialService.createFromReservation({
              reservationCode: this.reservationCode,
              ...formData,
              dateCreated: moment(
                new Date(),
                DateConstant.DATE_LANGUAGE
              ).format()
            }).toPromise();
          } else {
            res = await this.burialService.create(formData).toPromise();
          }
        } else {
          res = await this.burialService.update(this.burialCode, formData).toPromise();
        }
        if (res.success) {
          this.snackBar.open('Saved!', 'close', {
            panelClass: ['style-success'],
          });
          this.router.navigate(['/burial/' + res.data.burialCode + '/details']);
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          this.burialCode = res.data.burialCode;
          this.burial = res.data;
          this.isReadOnly = true;
          this.isNew = false;
          this.canAddEdit = true;
          await this.ngAfterViewInit();
          dialogRef.close();
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
    });
  }

  onSelectChange({ lotCode, block }) {
    this.burialForm.setSelectedLot({lotCode, block})
  }

  onLoadComplete() {
    const { mapData, lotCode, block } = this.isNewFromReservation ? this.burialForm.lot : this.burial?.lot;
    const { zoom, pan } = mapData;
    // this.mapBox.setZoom(Number(zoom));
    this.mapBox.setPan(pan.x, pan.y);
    this.mapBox.selectLot(lotCode, block, true);
  }

  onDelete() {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Delete burial?';
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
      this.isProcessing = true;
      dialogRef.componentInstance.isProcessing = this.isProcessing;
      try {
        let res = await this.burialService.delete(this.burialCode).toPromise();
        if (res.success) {
          this.snackBar.open('Successfully deleted!', 'close', {
            panelClass: ['style-success'],
          });
          this.router.navigate(['/burial/']);
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
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
    });
  }

  onGenerateCertificate() {
    const generateLink = environment.apiBaseUrl + this.appconfig.config.apiEndPoints.certificate.generateCertificate + this.burial?.burialCode;
    if(environment.production) {
      window.open(environment.pdfViewerLinkTemplate + generateLink, "_blank");
    } else {
      window.open(generateLink, "_blank");
    }
  }
}
