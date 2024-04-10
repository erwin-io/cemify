import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MapComponent } from './map.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MapBoxModule } from 'src/app/shared/map-box/map-box.module';
import { MapSearchComponent } from './map-search/map-search.component';
import { MapSearchDetailsComponent } from './map-search-details/map-search-details.component';

export const routes: Routes = [
  {
    path: '',
    component: MapComponent,
    pathMatch: 'full',
    data: { title: "Map" }
  }
];

@NgModule({
  declarations: [MapComponent, MapSearchComponent, MapSearchDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DataTableModule,
    MapBoxModule,
    RouterModule.forChild(routes),
  ]
})
export class MapModule { }
