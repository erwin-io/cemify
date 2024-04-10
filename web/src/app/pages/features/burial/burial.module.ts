import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurialComponent } from './burial.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { BurialDetailsComponent } from './burial-details/burial-details.component';
import { BurialFormComponent } from './burial-form/burial-form.component';
import { MapBoxModule } from 'src/app/shared/map-box/map-box.module';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/burial'
  },
  {
    path: '',
    pathMatch: 'full',
    component: BurialComponent,
    data: { title: "Burial",}
  },
  {
    path: 'new',
    component: BurialDetailsComponent,
    data: { title: "Burial", isNew: true}
  },
  {
    path: ':reservationCode/from-reservation',
    component: BurialDetailsComponent,
    data: { title: "Burial", isNew: true}
  },
  {
    path: ':burialCode/details',
    component: BurialDetailsComponent,
    data: { title: "Burial" }
  },
  {
    path: ':burialCode/edit',
    component: BurialDetailsComponent,
    data: { title: "Burial", edit: true }
  }
]

@NgModule({
  declarations: [
    BurialComponent,
    BurialDetailsComponent,
    BurialFormComponent,
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
export class BurialModule { }
