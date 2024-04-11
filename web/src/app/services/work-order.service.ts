import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { WorkOrder } from '../model/work-order.model';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByAdvanceSearch(params:{
    order: any,
    columnDef: { apiNotation: string; filter: string; type?: string }[],
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
