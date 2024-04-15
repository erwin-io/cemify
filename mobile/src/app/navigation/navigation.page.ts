import { StatusBarService } from 'src/app/services/status-bar.service';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage implements OnInit, OnDestroy {
  currentUser: any;
  active = '';
  // totalUnreadNotification = 0;
  constructor(
    private storageService: StorageService,
    private platform: Platform,
    private statusBarService: StatusBarService,
    private alertController: AlertController) {
      this.currentUser = this.storageService.getLoginUser();
      this.statusBarService.modifyStatusBar(Style.Default, '#004d40');
    }

  get totalUnreadNotification() {
    const total = this.storageService.getTotalUnreadNotif();
    return total? Number(total) : 0;
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    //stop session
  }

  ionViewWillLeave(){
  }

  async onTabsWillChange(event) {
    this.active = event.tab;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @HostListener('click', ['$event.target']) onClick(e) {
  }

  async presentAlert(options: AlertOptions) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
