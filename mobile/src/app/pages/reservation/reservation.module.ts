import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationPageRoutingModule } from './reservation-routing.module';

import { ReservationPage } from './reservation.page';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MapBoxModule } from 'src/app/shared/map-box/map-box.module';
import { PickLotComponent } from './reservation-details/pick-lot/pick-lot.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    MapBoxModule,
    ReservationPageRoutingModule
  ],
  declarations: [ReservationPage, ReservationDetailsComponent, PickLotComponent]
})
export class ReservationPageModule {}
