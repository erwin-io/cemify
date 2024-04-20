import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';
import { Users } from '../model/users';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getUsersByAdvanceSearch(params: {
    order: any;
    columnDef: { apiNotation: string; filter: string }[];
    pageSize: number;
    pageIndex: number;
  }): Observable<ApiResponse<{ results: Users[]; total: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.getUsersByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  getByCode(userCode: string): Observable<ApiResponse<Users>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.getByCode + userCode + '/details')
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  createUsers(data: any): Observable<ApiResponse<Users>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.createUsers, data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  createTenantUsers(data: any): Observable<ApiResponse<Users>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.auth.registerTenant, data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  updateProfile(userCode: string, data: any): Observable<ApiResponse<Users>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.updateProfile + userCode, data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  updateProfilePicture(userCode: string, data: any): Observable<ApiResponse<Users>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.updateProfilePicture + userCode, data)
    .pipe(
      tap(_ => this.log('users')),
      catchError(this.handleError('users', []))
    );
  }

  updateUsers(id: string, data: any): Observable<ApiResponse<Users>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.updateUsers + id, data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  resetUserPassword(userCode: string, data: any): Observable<ApiResponse<Users>> {
    return this.http.put<any>(environment.apiBaseUrl +
      this.appconfig.config.apiEndPoints.user.resetUserPassword + userCode + '/resetPassword', data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  approveAccessRequest(data: any): Observable<ApiResponse<Users>> {
    return this.http.put<any>(environment.apiBaseUrl +
      this.appconfig.config.apiEndPoints.user.approveAccessRequest + 'approveAccessRequest', data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
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
