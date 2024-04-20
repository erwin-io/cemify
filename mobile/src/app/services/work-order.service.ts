import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { WorkOrder } from '../model/work-order.model';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; name?: string; filter: string; type?: string }[],
    pageSize: number,
    pageIndex: number
  }): Observable<ApiResponse<{ results: WorkOrder[], total: number}>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.workOrder.getByAdvanceSearch,
      params)
    .pipe(
      tap(_ => this.log('workOrder')),
      catchError(this.handleError('workOrder', []))
    );
  }

  getByCode(workOrderCode: string): Observable<ApiResponse<WorkOrder>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.workOrder.getByCode + workOrderCode)
    .pipe(
      tap(_ => this.log('workOrder')),
      catchError(this.handleError('workOrder', []))
    );
  }

  create(data: any): Observable<ApiResponse<WorkOrder>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.workOrder.create, data)
    .pipe(
      tap(_ => this.log('workOrder')),
      catchError(this.handleError('workOrder', []))
    );
  }

  update(id: string, data: any): Observable<ApiResponse<WorkOrder>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.workOrder.update + id, data)
    .pipe(
      tap(_ => this.log('workOrder')),
      catchError(this.handleError('workOrder', []))
    );
  }

  updateStatus(id: string, data: any): Observable<ApiResponse<WorkOrder>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.workOrder.updateStatus + id, data)
    .pipe(
      tap(_ => this.log('workOrder')),
      catchError(this.handleError('workOrder', []))
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
