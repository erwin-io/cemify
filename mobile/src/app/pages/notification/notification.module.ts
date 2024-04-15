import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipeModule } from 'src/app/shared/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    MaterialModule,
    PipeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
