import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getLot(): Observable<ApiResponse<{
    totalAvailable: number;
    totalOccupied: number;
    totalUnavailable: number;
  }>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.dashboard.getLot)
    .pipe(
      tap(_ => this.log('dashboard')),
      catchError(this.handleError('dashboard', []))
    );
  }

  getBurialAndReservationRecords(): Observable<ApiResponse<{
    totalRecords: number;
    totalPending: number;
    totalForLeased: number;
  }>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.dashboard.getBurialAndReservationRecords)
    .pipe(
      tap(_ => this.log('dashboard')),
      catchError(this.handleError('dashboard', []))
    );
  }

  getUsers(): Observable<ApiResponse<{
    totalClient: number;
    totalAdmin: number;
    totalStaff: number;
  }>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.dashboard.getUsers)
    .pipe(
      tap(_ => this.log('dashboard')),
      catchError(this.handleError('dashboard', []))
    );
  }

  getLotTrackerByBlock(): Observable<ApiResponse<{
    a: any;
    b: any;
    c: any;
    d: any;
    e: any;
  }>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.dashboard.getLotTrackerByBlock)
    .pipe(
      tap(_ => this.log('dashboard')),
      catchError(this.handleError('dashboard', []))
    );
  }

  getAnnualBurialReport({yearFrom, yearTo}): Observable<ApiResponse<any[]>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.dashboard.getAnnualBurialReport, {yearFrom, yearTo})
    .pipe(
      tap(_ => this.log('dashboard')),
      catchError(this.handleError('dashboard', []))
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
