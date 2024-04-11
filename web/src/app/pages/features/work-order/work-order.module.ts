import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MapBoxModule } from 'src/app/shared/map-box/map-box.module';
import { WorkOrderDetailsComponent } from './work-order-details/work-order-details.component';
import { WorkOrderFormComponent } from './work-order-form/work-order-form.component';
import { WorkOrderComponent } from './work-order.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/work-order/pending'
  },
  {
    path: 'pending',
    pathMatch: 'full',
    component: WorkOrderComponent,
    data: { title: "Work Order", tab: 0 }
  },
  {
    path: 'inprogress',
    pathMatch: 'full',
    component: WorkOrderComponent,
    data: { title: "Work Order", tab: 1 }
  },
  {
    path: 'completed',
    pathMatch: 'full',
    component: WorkOrderComponent,
    data: { title: "Work Order", tab: 2 }
  },
  {
    path: 'cancelled',
    pathMatch: 'full',
    component: WorkOrderComponent,
    data: { title: "Work Order", tab: 3 }
  },
  {
    path: 'new',
    component: WorkOrderDetailsComponent,
    data: { title: "Work Order", details: true, isNew: true}
  },
  {
    path: ':workOrderCode/details',
    component: WorkOrderDetailsComponent,
    data: { title: "Work Order", details: true }
  },
  {
    path: ':workOrderCode/edit',
    component: WorkOrderDetailsComponent,
    data: { title: "Work Order", details: true, edit: true }
  }
]

@NgModule({
  declarations: [
    WorkOrderComponent,
    WorkOrderDetailsComponent,
    WorkOrderFormComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DataTableModule,
    MapBoxModule
  ]
})
export class WorkOrderModule { }
