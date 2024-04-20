import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    AccountPageRoutingModule
  ],
  declarations: [AccountPage, AccountSettingsComponent, ResetPasswordComponent]
})
export class AccountPageModule {}
