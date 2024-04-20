import { Injectable } from '@angular/core';
import { IServices } from './interface/iservices';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Reservation } from '../model/reservation.model';
import { AppConfigService } from './app-config.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; name?: string; filter?: string; type?: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: Reservation[], total: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.reservation.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('reservation')),
      catchError(this.handleError('reservation', []))
    );
  }

  getByCode(reservationCode: string): Observable<ApiResponse<Reservation>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.reservation.getByCode + reservationCode)
    .pipe(
      tap(_ => this.log('reservation')),
      catchError(this.handleError('reservation', []))
    );
  }

  create(data: any): Observable<ApiResponse<Reservation>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.reservation.create, data)
    .pipe(
      tap(_ => this.log('reservation')),
      catchError(this.handleError('reservation', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<Reservation>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.reservation.update + id, data)
    .pipe(
      tap(_ => this.log('reservation')),
      catchError(this.handleError('reservation', []))
    );
  }

  updateStatus(id: string, data: any): Observable<ApiResponse<Reservation>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.reservation.updateStatus + id, data)
    .pipe(
      tap(_ => this.log('reservation')),
      catchError(this.handleError('reservation', []))
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
