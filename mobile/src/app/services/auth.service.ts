/* eslint-disable @angular-eslint/contextual-lifecycle */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

import { catchError, takeUntil, tap } from 'rxjs/operators';
import { IServices } from './interface/iservices';
import { AppConfigService } from './app-config.service';
import { ApiResponse } from '../model/api-response.model';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IServices {

  isLoggedIn = false;
  redirectUrl: string;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient,
    private appconfig: AppConfigService,
    private storageService: StorageService,
    ) { }

    async ngOnDestroy() {
      this.ngUnsubscribe.next();
      // This completes the subject properlly.
      this.ngUnsubscribe.complete();
    }


  loginClient(data: any): Observable<ApiResponse<Users>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.auth.loginClient, data)
    .pipe(
      takeUntil(this.ngUnsubscribe),
      tap(_ => this.isLoggedIn = true),
      catchError(this.handleError('login', []))
    );
  }

  loginStaff(data: any): Observable<ApiResponse<Users>> {
  return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.auth.loginStaff, data)
  .pipe(
    takeUntil(this.ngUnsubscribe),
    tap(_ => this.isLoggedIn = true),
    catchError(this.handleError('login', []))
  );
}
  logout(): Observable<any> {
    const currentUser = this.storageService.getLoginUser();
    if(currentUser) {
    }
    this.storageService.saveAccessToken(null);
    this.storageService.saveRefreshToken(null);
    this.storageService.saveLoginUser(null);
    // this.storageService.saveSessionExpiredDate(null);
    this.storageService.saveTotalUnreadNotif(0);
    window.location.href = 'landing-page';
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.auth.logout)
    .pipe(
      takeUntil(this.ngUnsubscribe),
      tap(_ => this.isLoggedIn = false),
      catchError(this.handleError('logout', []))
    );
  }

  registerClient(data: any): Observable<ApiResponse<Users>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.auth.registerClient, data)
    .pipe(
      takeUntil(this.ngUnsubscribe),
      tap(_ => this.log('register')),
      catchError(this.handleError('register', []))
    );
  }

  refreshToken(data: any): Observable<any> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.auth.refreshToken, data)
    .pipe(
      tap(_ => this.log('refresh token')),
      catchError(this.handleError('refresh token', []))
    );
  }

  verifyOtp(data: any): Observable<any> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.auth.verifyOtp, data)
    .pipe(
      tap(_ => this.isLoggedIn = true),
      catchError(this.handleError('verify-otp', []))
    );
  }

  handleError<T>(operation = 'operation', result?: T) {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${Array.isArray(error.error.message) ? error.error.message[0] : error.error.message}`);
      return of(error.error as T);
    };
  }

  log(message: string) {
    console.log(message);
  }
}
