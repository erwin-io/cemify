/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, IonRefresher, ModalController } from '@ionic/angular';
import { Reservation } from 'src/app/model/reservation.model';
import { Users } from 'src/app/model/users';
import { AnimationService } from 'src/app/services/animation.service';
import { AuthService } from 'src/app/services/auth.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { PusherService } from 'src/app/services/pusher.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { StorageService } from 'src/app/services/storage.service';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  modal: HTMLIonModalElement;
  currentUser: Users;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order = { reservationId: 'DESC' };
  isLoading = false;
  error: any;
  @ViewChild(IonRefresher)ionRefresher: IonRefresher;

  reservations: Reservation[] = [];
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
  private reservationService: ReservationService) { }


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
      this.reservations = [];
      this.initReservation(true);
    }
  }

  async doRefresh(){
    try {
      if(this.isLoading) {
        return;
      }
      this.pageIndex = 0;
      this.pageSize = 10;
      this.reservations = [];
      await this.initReservation(true);
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

  async initReservation(showProgress = false) {
    try {
      this.isLoading = showProgress;
      this.reservationService.getByAdvanceSearch({
        order: this.order,
        columnDef: [ {
          apiNotation: 'user.userCode',
          filter: this.currentUser?.userCode,
          name: 'userCode',
          type: 'precise'
        }],
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).subscribe((res)=> {
        if(res.success){
          this.total = res.data.total;
          // this.reservations = res.data.results;
          this.reservations = [ ...this.reservations, ...res.data.results ];
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

  async onNewReservation() {
    let modal: any = null;
    modal = await this.modalCtrl.create({
      component: ReservationDetailsComponent,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: true,
      enterAnimation: this.animationService.flyUpAnimation,
      leaveAnimation: this.animationService.leaveFlyUpAnimation,
      componentProps: { modal, currentUser: this.currentUser, isNew: true, isEditMode: true },
    });
    modal.present();
    modal.onWillDismiss().then(async (res: {data: Reservation; role: any})=>{
      if(res.data && res.data.reservationCode) {
        this.reservations = [];
        this.pageIndex = 0;
        this.total = 0;
        await this.initReservation(true);
      }
    });
  }

  async onOpenDetails(reservation: Reservation) {
    let modal: any = null;
    modal = await this.modalCtrl.create({
      component: ReservationDetailsComponent,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: true,
      enterAnimation: this.animationService.flyUpAnimation,
      leaveAnimation: this.animationService.leaveFlyUpAnimation,
      componentProps: { modal, reservation, currentUser: this.currentUser, isNew: false, isEditMode: false },
    });
    modal.present();
    modal.onWillDismiss().then(async (res: {data: Reservation; role: any})=>{
      if(res.data && res.data.reservationCode) {
        this.reservations = [];
        this.pageIndex = 0;
        this.total = 0;
        await this.initReservation(true);
      }
    });
  }

  async loadMore() {
    this.pageIndex = this.pageIndex + 1;
    await this.initReservation();
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }

}
