import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Component, OnInit } from '@angular/core';
import { ReservationPage } from '../reservation/reservation.page';
import { ActionSheetController, AlertController, ModalController, Platform } from '@ionic/angular';
import { AnimationService } from 'src/app/services/animation.service';
import { NotificationPage } from '../notification/notification.page';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { StorageService } from 'src/app/services/storage.service';
import { Users } from 'src/app/model/users';
import { AuthService } from 'src/app/services/auth.service';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { UserService } from 'src/app/services/user.service';
import { WorkOrderPage } from '../work-order/work-order.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  currentUser: Users;
  profilePicSource;
  isSubmitting = false;
  constructor(
    private platform: Platform,
    private actionSheetController: ActionSheetController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private userService: UserService,
    private animationService: AnimationService,
    private storageService: StorageService,
    private alertController: AlertController,
  ) {
    this.currentUser = this.storageService.getLoginUser();
  }

  get totalUnreadNotification() {
    const total = this.storageService.getTotalUnreadNotif();
    return total && !isNaN(Number(total)) ? Number(total) : 0;
  }

  ngOnInit() {}

  async onOpenAccountSettings() {
    let modal: HTMLIonModalElement = null;
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
    modal.onDidDismiss().then(res=> {
      if(res.data && res.role === 'ok') {
        this.currentUser = res.data;
      }
    });
  }

  async onOpenResetPassword() {
    let modal: any = null;
    modal = await this.modalCtrl.create({
      component: ResetPasswordComponent,
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

  async onOpenWorkOrder() {
    let modal: any = null;
    modal = await this.modalCtrl.create({
      component: WorkOrderPage,
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
  async signout() {
    const logoutSheet = await this.actionSheetController.create({
      cssClass: 'app-action-sheet',
      header: 'Do you want to logout?',
      buttons: [
        {
          text: 'Yes?',
          handler: async () => {
            this.authService.logout();
            logoutSheet.dismiss();
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

  async onShowChangeProfilePicMenu() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'sched-card-action-sheet',
      buttons: [
        {
          text: 'Camera',
          handler: async () => {
            const image = await Camera.getPhoto({
              quality: 90,
              allowEditing: false,
              resultType: CameraResultType.Uri,
              source: CameraSource.Camera, // Camera, Photos or Prompt!
            });
            if (image) {
              const base64Data = await this.readAsBase64(image);
              this.profilePicSource = base64Data;
              await this.saveProfilePicture(
                {
                  userId: this.currentUser.userId,
                  userProfilePic: {
                    fileName: `profile-sample-name.${image.format}`,
                    data: base64Data,
                  }
                });
            }
            actionSheet.dismiss();
          },
        },
        {
          text: 'Gallery',
          handler: async () => {
            const image = await Camera.getPhoto({
              quality: 90,
              allowEditing: false,
              resultType: CameraResultType.Uri,
              source: CameraSource.Photos, // Camera, Photos or Prompt!
            });
            if (image) {
              const base64Data = await this.readAsBase64(image);
              this.profilePicSource = base64Data;
              await this.saveProfilePicture(
                {
                  userId: this.currentUser.userId,
                  userProfilePic: {
                    fileName: `profile-sample-name.${image.format}`,
                    data: base64Data,
                  }
                });
            }
            actionSheet.dismiss();
          },
        },
        {
          text: 'Cancel',
          handler: async () => {
            actionSheet.dismiss();
          },
        },
      ],
    });
    await actionSheet.present();

    // const result = await actionSheet.onDidDismiss();
    // console.log(result);
  }

  async saveProfilePicture(params) {
    try {
      this.isSubmitting = true;
      this.userService.updateProfilePicture(this.currentUser.userCode, params).subscribe(
        async (res) => {
          console.log(res);
          if (res.success) {
            console.log(res);
            this.isSubmitting = false;
            this.currentUser.userProfilePic = res.data.userProfilePic;
            this.storageService.saveLoginUser(this.currentUser);
          } else {
            this.isSubmitting = false;
            await this.presentAlert({
              header: 'Try again!',
              message: Array.isArray(res.message)
                ? res.message[0]
                : res.message,
              buttons: ['OK'],
            });
          }
        },
        async (err) => {
          this.isSubmitting = false;
          await this.presentAlert({
            header: 'Try again!',
            message: Array.isArray(err.message) ? err.message[0] : err.message,
            buttons: ['OK'],
          });
        }
      );
    } catch (e) {
      this.isSubmitting = false;
      await this.presentAlert({
        header: 'Try again!',
        message: Array.isArray(e.message) ? e.message[0] : e.message,
        buttons: ['OK'],
      });
    }
  }

  async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      const base64 = (await this.convertBlobToBase64(blob)) as string;
      return base64.split(',')[1];
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    return await alert.present();
  }

  profilePicErrorHandler(event) {
    return '../../../assets/img/person.png';
  }
}
