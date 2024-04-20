/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonRefresher, ModalController, AlertController, ActionSheetController } from '@ionic/angular';
import { Users } from 'src/app/model/users';
import { WorkOrder } from 'src/app/model/work-order.model';
import { AnimationService } from 'src/app/services/animation.service';
import { AuthService } from 'src/app/services/auth.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { PusherService } from 'src/app/services/pusher.service';
import { StorageService } from 'src/app/services/storage.service';
import { WorkOrderDetailsComponent } from './work-order-details/work-order-details.component';
import { WorkOrderService } from 'src/app/services/work-order.service';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.page.html',
  styleUrls: ['./work-order.page.scss'],
})
export class WorkOrderPage implements OnInit {
  modal: HTMLIonModalElement;
  currentUser: Users;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order = { workOrderId: 'DESC' };
  isLoading = false;
  error: any;
  @ViewChild(IonRefresher)ionRefresher: IonRefresher;

  workOrders: WorkOrder[] = [];
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private pageLoaderService: PageLoaderService,
    private alertController: AlertController,
    private authService: AuthService,
    private animationService: AnimationService,
    private storageService: StorageService,
    private actionSheetCtrl: ActionSheetController,
    private pusherService: PusherService,
  private workOrderService: WorkOrderService) { }


  get isAuthenticated() {
    const currentUser = this.storageService.getLoginUser();
    return currentUser &&
    currentUser?.userCode &&
    currentUser?.userId;
  }

  ngOnInit() {
    if(this.isAuthenticated) {
      this.pageIndex = 0;
      this.pageSize = 10;
      this.workOrders = [];
      this.initWorkOrder(true);
    }
  }

  async doRefresh(){
    try {
      if(this.isLoading) {
        return;
      }
      this.pageIndex = 0;
      this.pageSize = 10;
      this.workOrders = [];
      await this.initWorkOrder(true);
    }catch(ex) {
      if(this.ionRefresher) {
        this.ionRefresher.complete();
      }
      await this.presentAlert({
        header: 'Try again!',
        message: Array.isArray(ex.message) ? ex.message[0] : ex.message,
        buttons: ['OK']
      });
    }
  }

  async initWorkOrder(showProgress = false) {
    try {
      this.isLoading = showProgress;
      this.workOrderService.getByAdvanceSearch({
        order: this.order,
        columnDef: [ {
          apiNotation: 'assignedStaffUser.userCode',
          filter: this.currentUser?.userCode,
          name: 'assignedStaffUser',
          type: 'precise'
        }],
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).subscribe((res)=> {
        if(res.success){
          console.log(res.data);
          this.total = res.data.total;
          // this.workOrders = res.data.results;
          this.workOrders = [ ...this.workOrders, ...res.data.results ];
          this.isLoading = false;
          if(this.ionRefresher) {
            this.ionRefresher.complete();
          }
        } else {
          this.isLoading = false;
          this.error = Array.isArray(res.message)
            ? res.message[0]
            : res.message;
          this.presentAlert(this.error);
        }
      },
      async (err) => {
        this.isLoading = false;
        this.error = Array.isArray(err.message)
          ? err.message[0]
          : err.message;
        this.presentAlert(this.error);
      });
    } catch (e) {
      this.isLoading = false;
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.presentAlert(this.error);
    }
  }

  async onOpenDetails(workOrder: WorkOrder) {
    let modal: any = null;
    modal = await this.modalCtrl.create({
      component: WorkOrderDetailsComponent,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: true,
      enterAnimation: this.animationService.flyUpAnimation,
      leaveAnimation: this.animationService.leaveFlyUpAnimation,
      componentProps: { modal, workOrder, currentUser: this.currentUser, isNew: false, isEditMode: false },
    });
    modal.present();
    modal.onWillDismiss().then(async (res: {data: WorkOrder; role: any})=>{
      if(res.data && res.data.workOrderCode) {
        this.workOrders = [];
        this.pageIndex = 0;
        this.total = 0;
        await this.initWorkOrder(true);
      }
    });
  }

  async loadMore() {
    this.pageIndex = this.pageIndex + 1;
    await this.initWorkOrder();
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }

}
