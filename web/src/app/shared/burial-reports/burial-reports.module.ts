import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurialReportsComponent } from './burial-reports.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from '../data-table/data-table.module';
import { MapBoxModule } from '../map-box/map-box.module';
import { MaterialModule } from '../material/material.module';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/burial-reports'
  },
  {
    path: '',
    pathMatch: 'full',
    component: BurialReportsComponent,
    data: { title: "Burial",}
  },
]

@NgModule({
  declarations: [
    BurialReportsComponent
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
export class BurialReportsModule { }
