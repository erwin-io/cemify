/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, IonModal, ModalController } from '@ionic/angular';
import { Reservation } from 'src/app/model/reservation.model';
import { AnimationService } from 'src/app/services/animation.service';
import { AuthService } from 'src/app/services/auth.service';
import { LotService } from 'src/app/services/lot.service';
import { PickLotComponent } from './pick-lot/pick-lot.component';
import { Lot } from 'src/app/model/lot.model';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ApiResponse } from 'src/app/model/api-response.model';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
})
export class ReservationDetailsComponent implements OnInit {
  reservation: Reservation;
  isNew = false;
  isEditMode = false;
  modal;
  currentUser;
  form: FormGroup;
  selectedLot: Lot;
  isSubmitting = false;
  isOpenResultModal = false;
  resultModal: {
    type: 'success' | 'failed' | 'warning';
    title: string;
    desc: string;
    done?;
    retry?;
  };
  isModified = true;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    private actionSheetController: ActionSheetController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private reservationServicer: ReservationService,
    private animationService: AnimationService,
    private appconfig: AppConfigService,
    private router: Router,
    private pageLoaderService: PageLoaderService,
    private alertController: AlertController
  ) {}
  get canEdit() {
    return this.isNew
      ? true
      : this.reservation &&
          this.reservation?.reservationCode &&
          this.reservation.status === 'PENDING';
  }

  get formData() {
    return this.form.value;
  }

  get formControls() {
    return this.form.controls;
  }

  ngOnInit() {
    this.onCreateForm();
    if (!this.isNew && this.reservation) {
      this.selectedLot = this.reservation.lot;
      this.onPopulateDataToForm(this.reservation);
    }
  }

  ngOnDestroy(): void {
    // This aborts all HTTP requests.
    this.ngUnsubscribe.next();
    // This completes the subject properlly.
    this.ngUnsubscribe.complete();
  }

  onCreateForm() {
    if (this.isNew || this.isEditMode) {
      this.form = this.formBuilder.group({
        lotCode: new FormControl(null, [Validators.required]),
        burialName: new FormControl(null, [Validators.required]),
        dateOfBirth: new FormControl(new Date().toISOString(), [
          Validators.required,
        ]),
        dateOfDeath: new FormControl(new Date().toISOString(), [
          Validators.required,
        ]),
        dateOfBurial: new FormControl(new Date().toISOString(), [
          Validators.required,
        ]),
        familyContactPerson: new FormControl(null, [Validators.required]),
        familyContactNumber: new FormControl(null, [Validators.required]),
      });
    } else if (!this.isEditMode) {
      this.form = this.formBuilder.group({
        lotCode: new FormControl(null),
        burialName: new FormControl(null),
        dateOfBirth: new FormControl(new Date().toISOString()),
        dateOfDeath: new FormControl(new Date().toISOString()),
        dateOfBurial: new FormControl(new Date().toISOString()),
        familyContactPerson: new FormControl(null),
        familyContactNumber: new FormControl(null),
      });
    }
    // this.form.controls.dateOfBirth.valueChanges.subscribe(res=> {
    //   setTimeout(()=> {
    //     if(!this.form.controls.dateOfBirth.dirty && !this.form.controls.dateOfBirth.touched) {
    //       this.form.controls.dateOfBirth.markAsDirty();
    //       this.form.controls.dateOfBirth.markAsDirty();
    //       this.form.controls.dateOfBirth.updateValueAndValidity();
    //     }
    //   }, 2000);
    // });
    // this.form.controls.dateOfDeath.valueChanges.subscribe(res=> {
    //   setTimeout(()=> {
    //     if(!this.form.controls.dateOfDeath.dirty && !this.form.controls.dateOfDeath.touched) {
    //       this.form.controls.dateOfDeath.markAsDirty();
    //       this.form.controls.dateOfDeath.markAsDirty();
    //       this.form.controls.dateOfDeath.updateValueAndValidity();
    //     }
    //   }, 2000);
    // });
    // this.form.controls.dateOfBurial.valueChanges.subscribe(res=> {
    //   setTimeout(()=> {
    //     if(!this.form.controls.dateOfBurial.dirty &&  !this.form.controls.dateOfBurial.touched) {
    //       this.form.controls.dateOfBurial.markAsDirty();
    //       this.form.controls.dateOfBurial.markAsDirty();
    //       this.form.controls.dateOfBurial.updateValueAndValidity();
    //     }
    //   }, 2000);
    // });
  }

  onPopulateDataToForm(reservation: Reservation) {
    this.form.setValue({
      lotCode: reservation?.lot?.lotCode,
      burialName: reservation?.burialName,
      dateOfBirth: reservation?.dateOfBirth,
      dateOfDeath: reservation?.dateOfDeath,
      dateOfBurial: reservation?.dateOfBurial,
      familyContactPerson: reservation?.familyContactPerson,
      familyContactNumber: reservation?.familyContactNumber,
    });
  }

  triggerControlStatus(control) {
    if (this.form.controls[control]) {
      this.form.controls[control].markAsDirty();
      this.form.controls[control].markAsDirty();
      this.form.controls[control].updateValueAndValidity();
    }
  }

  async onShowPickLotModal() {
    let modal: HTMLIonModalElement = null;
    modal = await this.modalCtrl.create({
      component: PickLotComponent,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: true,
      enterAnimation: this.animationService.pushLeftAnimation,
      leaveAnimation: this.animationService.leavePushLeftAnimation,
      componentProps: {
        modal,
        currentUser: this.currentUser,
        selectedLot: this.selectedLot,
        config: {
          mode: this.isEditMode ? 'PICK' : 'NAVIGATE',
          disableSelection: !this.isEditMode,
        },
      },
    });
    modal.present();
    modal.onWillDismiss().then((res: { data: Lot; role: any }) => {
      console.log(res.data);
      if (res?.data && res?.data.lotCode) {
        this.selectedLot = res.data;
        this.formControls.lotCode.setValue(res.data?.lotCode);
        this.form.markAsTouched();
        this.form.markAsDirty();
        this.form.updateValueAndValidity();
      }
    });
  }

  onEdit(edit = true) {
    this.isEditMode = edit;
    this.isNew = false;
    this.onCreateForm();
    if (!this.isNew && this.reservation) {
      this.onPopulateDataToForm(this.reservation);
    }
  }

  async onSaveReservation() {
    if (!this.form.valid) {
      return;
    }
    const param = {
      ...this.form.value,
      userCode: this.currentUser?.userCode,
    };
    const logoutSheet = await this.actionSheetController.create({
      cssClass: 'app-action-sheet',
      header: 'Are you sure you want to update your this reservation?',
      buttons: [
        {
          text: 'Yes?',
          handler: async () => {
            try {
              this.isSubmitting = true;
              await this.pageLoaderService.open('Processing please wait...');
              let res: ApiResponse<Reservation>;
              this.isModified = true;
              if (this.isNew) {
                res = await this.reservationServicer
                  .create(param)
                  .pipe(
                    takeUntil(this.ngUnsubscribe),
                    catchError(this.handleError('login', []))
                  )
                  .toPromise();
              } else {
                res = await this.reservationServicer
                  .update(this.reservation?.reservationCode, param)
                  .pipe(
                    takeUntil(this.ngUnsubscribe),
                    catchError(this.handleError('login', []))
                  )
                  .toPromise();
              }
              if (res.success) {
                console.log(res.data);
                await this.pageLoaderService.close();
                this.isOpenResultModal = true;
                this.resultModal = {
                  title: 'Success!',
                  desc: this.isNew
                    ? 'Reservation was successfully submitted'
                    : 'Reservation was successfully updated',
                  type: 'success',
                  done: () => {
                    this.isOpenResultModal = false;
                    this.reservation = res.data;
                    this.selectedLot = res.data.lot;
                    this.isSubmitting = false;
                    this.isNew = false;
                    this.isEditMode = false;
                  },
                };
              } else {
                await this.pageLoaderService.close();
                this.isSubmitting = false;
                this.isOpenResultModal = true;
                this.resultModal = {
                  title: 'Oops!',
                  desc: res.message,
                  type: 'failed',
                  retry: () => {
                    this.isOpenResultModal = false;
                  },
                };
              }
            } catch (e) {
              await this.pageLoaderService.close();
              this.isSubmitting = false;
              this.isOpenResultModal = true;
              this.resultModal = {
                title: 'Oops!',
                desc: Array.isArray(e.message) ? e.message[0] : e.message,
                type: 'failed',
                retry: () => {
                  this.isOpenResultModal = false;
                },
              };
            }
          },
        },
        {
          text: 'No',
          handler: async () => {
            logoutSheet.dismiss();
          },
        },
      ],
    });
    logoutSheet.present();
  }

  async cancelReservation() {
    const param = { status: 'CANCELLED' };
    const logoutSheet = await this.actionSheetController.create({
      cssClass: 'app-action-sheet',
      header: 'Do you want to cancel this reservation?',
      buttons: [
        {
          text: 'Yes?',
          handler: async () => {
            try {
              this.isSubmitting = true;
              await this.pageLoaderService.open('Processing please wait...');
              this.isModified = true;
              const res = await this.reservationServicer
                .updateStatus(this.reservation?.reservationCode, param)
                .pipe(
                  takeUntil(this.ngUnsubscribe),
                  catchError(this.handleError('login', []))
                )
                .toPromise();
              if (res.success) {
                console.log(res.data);
                await this.pageLoaderService.close();
                this.isOpenResultModal = true;
                this.resultModal = {
                  title: 'Done!',
                  desc: 'Reservation was successfully cancelled',
                  type: 'success',
                  done: () => {
                    this.isOpenResultModal = false;
                    this.reservation = res.data;
                    this.selectedLot = res.data.lot;
                    this.isSubmitting = false;
                    this.isNew = false;
                    this.isEditMode = false;
                  },
                };
              } else {
                await this.pageLoaderService.close();
                this.isSubmitting = false;
                this.isOpenResultModal = true;
                this.resultModal = {
                  title: 'Oops!',
                  desc: res.message,
                  type: 'failed',
                  retry: () => {
                    this.isOpenResultModal = false;
                  },
                };
              }
            } catch (e) {
              await this.pageLoaderService.close();
              this.isSubmitting = false;
              this.isOpenResultModal = true;
              this.resultModal = {
                title: 'Oops!',
                desc: Array.isArray(e.message) ? e.message[0] : e.message,
                type: 'failed',
                retry: () => {
                  this.isOpenResultModal = false;
                },
              };
            }
          },
        },
        {
          text: 'No',
          handler: async () => {
            logoutSheet.dismiss();
          },
        },
      ],
    });
    logoutSheet.present();
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    return await alert.present();
  }

  handleError<T>(operation = 'operation', result?: any) {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    return (error: any): Observable<any> => of(error.error as any);
  }
}
