import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapBoxComponent } from './map-box.component';
import { MaterialModule } from '../material/material.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MapBoxComponent],
  imports: [
    CommonModule,
    MaterialModule,
    IonicModule,
  ],
  exports: [MapBoxComponent]
})
export class MapBoxModule { }
