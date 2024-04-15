/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // sessionTimeout;
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private appconfig: AppConfigService
  ) {
    // this.sessionTimeout = Number(this.appconfig.config.sessionConfig.sessionTimeout);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string) {
    const user = this.storageService.getLoginUser();
    // const token = this.getRefreshToken(user.userId, refresh_token);

    if (!user) {
      this.authService.redirectUrl = url;
      // this.authService.logout();
      this.router.navigate(['/landing-page'], { replaceUrl: true });
      return false;
    }
    return true;
  }
}
