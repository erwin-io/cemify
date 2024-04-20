import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Burial } from '../model/burial.model';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';
import { Lot } from '../model/lot.model';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

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
