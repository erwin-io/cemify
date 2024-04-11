import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Lot } from '../model/lot.model';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class LotService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

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
