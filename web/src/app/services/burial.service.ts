import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Burial } from '../model/burial.model';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';
import { Lot } from '../model/lot.model';

@Injectable({
  providedIn: 'root'
})
export class BurialService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string; type?: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: Burial[], total: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.burial.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('burial')),
      catchError(this.handleError('burial', []))
    );
  }

  getAllByClientUserCode(userCode: string): Observable<ApiResponse<Burial>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.burial.getAllByClientUserCode + userCode)
    .pipe(
      tap(_ => this.log('burial')),
      catchError(this.handleError('burial', []))
    );
  }

  generateReport(): Observable<ApiResponse<Burial>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.burial.generateReport)
    .pipe(
      tap(_ => this.log('burial')),
      catchError(this.handleError('burial', []))
    );
  }

  searchMap(key: string): Observable<ApiResponse<{burial: Burial[]; lot: Lot[]}>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.burial.searchMap + key)
    .pipe(
      tap(_ => this.log('burial')),
      catchError(this.handleError('burial', []))
    );
  }

  getByCode(burialCode: string): Observable<ApiResponse<Burial>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.burial.getByCode + burialCode)
    .pipe(
      tap(_ => this.log('burial')),
      catchError(this.handleError('burial', []))
    );
  }

  create(data: any): Observable<ApiResponse<Burial>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.burial.create, data)
    .pipe(
      tap(_ => this.log('burial')),
      catchError(this.handleError('burial', []))
    );
  }

  createFromReservation(data: any): Observable<ApiResponse<Burial>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.burial.createFromReservation, data)
    .pipe(
      tap(_ => this.log('burial')),
      catchError(this.handleError('burial', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<Burial>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.burial.update + id, data)
    .pipe(
      tap(_ => this.log('burial')),
      catchError(this.handleError('burial', []))
    );
  }

  delete(burialCode: string): Observable<ApiResponse<Burial>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.burial.delete + burialCode)
    .pipe(
      tap(_ => this.log('access')),
      catchError(this.handleError('access', []))
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
