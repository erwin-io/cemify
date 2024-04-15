/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Plugins } from '@capacitor/core';
import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';


import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { OneSignalNotificationService } from './services/one-signal-notification.service';
import { LocalNotificationsService } from './services/local-notifications.service';
import { StatusBarService } from './services/status-bar.service';
import { Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  currentDeviceModel;
  constructor(
    private platform: Platform,
    private alertController: AlertController,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private actionSheetController: ActionSheetController,
    private storageService: StorageService,
    private oneSignalNotificationService: OneSignalNotificationService,
    private androidPermissions: AndroidPermissions,
    private localNotificationsService: LocalNotificationsService,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {

    Device.getInfo().then(res=> {
      this.currentDeviceModel = res.model;
    });

    this.platform.backButton.subscribeWithPriority(10, async () => {
      const modal = await this.modalCtrl.getTop();
      const activeSheet = await this.actionSheetController.getTop();
      if (modal) {
          modal.dismiss();
      } else if(activeSheet) {
        activeSheet.dismiss();
      }else {
        const actionSheet = await this.actionSheetController.create({
          buttons: [
            {
              text: 'Minimize the app?',
              handler: async () => {
                App.minimizeApp();
                actionSheet.dismiss();
              },
            },
            {
              text: 'Close the app?',
              handler: async () => {
                App.exitApp();
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
      }
    });
  }

  get _router() {
    return this.router;
  }

  get isAuthenticated() {
    const currentUser = this.storageService.getLoginUser();
    return currentUser &&
    currentUser?.userCode &&
    currentUser?.userId;
  }

  async ngOnInit() {
    this.platform.ready().then(async () => {
      if (Capacitor.platform !== 'web') {
        await this.localNotificationsService.init();
        await this.oneSignalNotificationService.registerOneSignal();
      }
    });
  }
  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
