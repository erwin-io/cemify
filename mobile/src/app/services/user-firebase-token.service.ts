import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { UserFirebaseToken } from '../model/user-firebase-token';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class UserFirebaseTokenService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByDevice(params: {
    userid: string,
    device: string
  }): Observable<ApiResponse<UserFirebaseToken>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.userFirebaseToken.getByDevice,
      params)
    .pipe(
      tap(_ => this.log('user-firebase-token')),
      catchError(this.handleError('user-firebase-token', []))
    );
  }

  create(data: any): Observable<ApiResponse<UserFirebaseToken>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.userFirebaseToken.create, data)
    .pipe(
      tap(_ => this.log('user-firebase-token')),
      catchError(this.handleError('user-firebase-token', []))
    );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (res: any): Observable<T> => {
      if(res.error && res.error?.message) {
        if(res.error?.error) {
          this.log(`${operation} failed: ${Array.isArray(res.error?.errorerror) ? res.error?.error[0] : res.error?.error}`);
          return of({
            success: false,
            message: res.error?.error
          } as any);
        } else {
          this.log(`${operation} failed: ${Array.isArray(res.error.message) ? res.error.message[0] : res.error.message}`);
          return of(res.error as T);
        }
      } else {
        if((res.name && res.name?.toString().toLowerCase().includes('httperrorresponse')) ||
        (res.message && res.message?.toString().toLowerCase().includes('http'))) {
          this.log(`${operation} failed: ${Array.isArray(res.message) ? res.message[0] : res.message}`);
          return of({
            success: false,
            message: 'Something went wrong, We cannot connect you to our server this time. Please try again!'
          } as any);
        } else {
          this.log(`${operation} failed: ${Array.isArray(res.message) ? res.message[0] : res.message}`);
          return of(res as any);
        }
      }
    };
  }

  log(message: string) {
    console.log(message);
  }
}
