import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from '../material/material.module';
import { MapBoxComponent } from './map-box.component';

@NgModule({
  declarations: [MapBoxComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  exports: [MapBoxComponent]
})
export class MapBoxModule { }
