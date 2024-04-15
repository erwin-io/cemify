import { Component, OnInit } from '@angular/core';
import { ReservationPage } from '../reservation/reservation.page';
import { ModalController } from '@ionic/angular';
import { AnimationService } from 'src/app/services/animation.service';
import { NotificationPage } from '../notification/notification.page';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { StorageService } from 'src/app/services/storage.service';
import { Users } from 'src/app/model/users';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  currentUser: Users;
  constructor(
    private modalCtrl: ModalController,
    private animationService: AnimationService,
    private storageService: StorageService,
  ) {
    this.currentUser = this.storageService.getLoginUser();
   }

  ngOnInit() {
  }

  async onOpenAccountSettings() {
    let modal: any = null;
    modal = await this.modalCtrl.create({
      component: AccountSettingsComponent,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: true,
      enterAnimation: this.animationService.flyUpAnimation,
      leaveAnimation: this.animationService.leaveFlyUpAnimation,
      componentProps: { modal, currentUser: this.currentUser },
    });
    modal.present();
  }

  async onOpenReservation() {
    let modal: any = null;
    modal = await this.modalCtrl.create({
      component: ReservationPage,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: true,
      enterAnimation: this.animationService.flyUpAnimation,
      leaveAnimation: this.animationService.leaveFlyUpAnimation,
      componentProps: { modal, currentUser: this.currentUser },
    });
    modal.present();
  }

  async onOpenNotifications() {
    let modal: any = null;
    modal = await this.modalCtrl.create({
      component: NotificationPage,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: true,
      enterAnimation: this.animationService.flyUpAnimation,
      leaveAnimation: this.animationService.leaveFlyUpAnimation,
      componentProps: { modal, currentUser: this.currentUser },
    });
    modal.present();
  }

}
