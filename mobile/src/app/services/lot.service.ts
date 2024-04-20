import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Lot } from '../model/lot.model';
import { IServices } from './interface/iservices';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { Subject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LotService implements IServices {

  isLoggedIn = false;
  redirectUrl: string;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient,
    private appconfig: AppConfigService
    ) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: Lot[], total: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.lot.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('lot')),
      catchError(this.handleError('lot', []))
    );
  }

  getByBlock(block: string): Observable<ApiResponse<Lot[]>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.lot.getByBlock + block)
    .pipe(
      tap(_ => this.log('lot')),
      catchError(this.handleError('lot', []))
    );
  }

  getByCode(lotCode: string): Observable<ApiResponse<Lot>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.lot.getByCode + lotCode)
    .pipe(
      tap(_ => this.log('lot')),
      catchError(this.handleError('lot', []))
    );
  }

  updateStatus(id: string, data: any): Observable<ApiResponse<Lot>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.lot.updateStatus + id, data)
    .pipe(
      tap(_ => this.log('lot')),
      catchError(this.handleError('lot', []))
    );
  }

  updateMapData(lotCode: string, data: any): Observable<ApiResponse<Lot>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.lot.updateMapData + lotCode, data)
    .pipe(
      tap(_ => this.log('lot')),
      catchError(this.handleError('lot', []))
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
