import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {

  constructor() { }

  async show(show = true) {
    const getPlatform = Capacitor.getPlatform();
    if (getPlatform !== 'web') {
      if(show) {
        await StatusBar.show();
      } else {
        await StatusBar.hide();
      }
    }
  }

  async overLay(overlay = true) {
    const getPlatform = Capacitor.getPlatform();
    if (getPlatform !== 'web') {
      await StatusBar.setOverlaysWebView({overlay});
    }
  }

  async modifyStatusBar(style: Style, color: string) {
    const getPlatform = Capacitor.getPlatform();
    if (getPlatform !== 'web') {
      await StatusBar.setStyle({style});
      await StatusBar.setBackgroundColor({color});
    }
  }

}
