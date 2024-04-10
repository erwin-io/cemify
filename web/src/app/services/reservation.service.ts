import { Injectable } from '@angular/core';
import { IServices } from './interface/iservices';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Reservation } from '../model/reservation.model';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string; type?: string }[],
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

  handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${Array.isArray(error.error.message) ? error.error.message[0] : error.error.message}`);
      return of(error.error as T);
    };
  }
  log(message: string) {
    console.log(message);
  }
}
