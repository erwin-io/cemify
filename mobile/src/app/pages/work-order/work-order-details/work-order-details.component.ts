import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { ApiResponse } from 'src/app/model/api-response.model';
import { Lot } from 'src/app/model/lot.model';
import { WorkOrder } from 'src/app/model/work-order.model';
import { AnimationService } from 'src/app/services/animation.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AuthService } from 'src/app/services/auth.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { WorkOrderService } from 'src/app/services/work-order.service';
import { PickLotComponent } from '../../reservation/reservation-details/pick-lot/pick-lot.component';

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.scss'],
})
export class WorkOrderDetailsComponent implements OnInit, OnDestroy {
  workOrder: WorkOrder;
  modal;
  currentUser;
  isSubmitting = false;
  isOpenResultModal = false;
  resultModal: { type: 'success' | 'failed' | 'warning'; title: string; desc: string; done?; retry? };
  isModified = true;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    private actionSheetController: ActionSheetController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private workOrderServicer: WorkOrderService,
    private animationService: AnimationService,
    private appconfig: AppConfigService,
    private router: Router,
    private pageLoaderService: PageLoaderService,
    private alertController: AlertController
  ) {
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
      // This aborts all HTTP requests.
      this.ngUnsubscribe.next();
      // This completes the subject properlly.
      this.ngUnsubscribe.complete();
  }

  async onUpdateStatus(status: 'INPROGRESS' | 'COMPLETED') {
    const param = { status };
    const logoutSheet = await this.actionSheetController.create({
      cssClass: 'app-action-sheet',
      header: status === 'INPROGRESS' ? 'Are you sure you want to mark this in progress?' :
       'Are you sure you want to mark this as completed?',
      buttons: [
        {
          text: 'Yes?',
          handler: async () => {
            try{
              this.isSubmitting = true;
              await this.pageLoaderService.open('Processing please wait...');
              this.isModified = true;
              const res = await this.workOrderServicer.updateStatus(this.workOrder?.workOrderCode, param)
              .pipe(
                takeUntil(this.ngUnsubscribe),
                catchError(this.handleError('login', []))
              ).toPromise();
              if (res.success) {
                console.log(res.data);
                await this.pageLoaderService.close();
                this.isOpenResultModal = true;
                this.resultModal = {
                  title: 'Done!',
                  desc: 'Work order status was successfully updated!',
                  type: 'success',
                  done: ()=> {
                    this.isOpenResultModal = false;
                    this.workOrder = res.data;
                    this.isSubmitting = false;
                    this.isModified = true;
                  }
                };
              } else {
                await this.pageLoaderService.close();
                this.isSubmitting = false;
                this.isOpenResultModal = true;
                this.resultModal = {
                  title: 'Oops!',
                  desc: res.message,
                  type: 'failed',
                  retry: ()=> {
                    this.isOpenResultModal = false;
                  },
                };
              }
            } catch (e){
              await this.pageLoaderService.close();
              this.isSubmitting = false;
              this.isOpenResultModal = true;
              this.resultModal = {
                title: 'Oops!',
                desc: Array.isArray(e.message) ? e.message[0] : e.message,
                type: 'failed',
                retry: ()=> {
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
