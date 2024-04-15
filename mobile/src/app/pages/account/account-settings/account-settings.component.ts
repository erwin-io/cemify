import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Users } from 'src/app/model/users';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  modal: HTMLIonModalElement;
  editProfileForm: FormGroup;
  currentUser: Users;
  isSubmitting = false;
  constructor(
    private modalCtrl: ModalController,) { }

  ngOnInit() {
    this.editProfileForm = new FormGroup({
      fullName: new FormControl(this.currentUser?.fullName, [Validators.required]),
      mobileNumber: new FormControl(this.currentUser?.mobileNumber, [Validators.required])
    });
  }
  get formData() {
    return this.editProfileForm.value;
  }

  get isFormDirty() {
    return (
      this.currentUser.fullName !== this.formData.fullName ||
      this.currentUser.mobileNumber !== this.formData.mobileNumber
    );
  }

  get controls() {
    return this.editProfileForm.controls;
  }


  getError(key: string) {
    return this.editProfileForm.controls[key];
  }

  onSubmit() {

  }
}
