import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { MapBoxModule } from 'src/app/shared/map-box/map-box.module';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/reservation/pending'
  },
  {
    path: 'pending',
    pathMatch: 'full',
    component: ReservationComponent,
    data: { title: "Reservation", tab: 0 }
  },
  {
    path: 'approved',
    pathMatch: 'full',
    component: ReservationComponent,
    data: { title: "Reservation", tab: 1 }
  },
  {
    path: 'leased',
    pathMatch: 'full',
    component: ReservationComponent,
    data: { title: "Reservation", tab: 2 }
  },
  {
    path: 'rejected',
    pathMatch: 'full',
    component: ReservationComponent,
    data: { title: "Reservation", tab: 3 }
  },
  {
    path: 'cancelled',
    pathMatch: 'full',
    component: ReservationComponent,
    data: { title: "Reservation", tab: 4 }
  },
  {
    path: 'new',
    component: ReservationDetailsComponent,
    data: { title: "Reservation", isNew: true}
  },
  {
    path: ':reservationCode/details',
    component: ReservationDetailsComponent,
    data: { title: "Reservation", }
  }
]

@NgModule({
  declarations: [
    ReservationComponent,
    ReservationDetailsComponent,
    ReservationFormComponent,
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
export class ReservationModule { }
