import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Reservation } from 'src/app/model/reservation.model';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent {
  reservation!: Reservation;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      reservationCode: new FormControl(),
      burialName: new FormControl(),
      dateTime: new FormControl(),
      dateOfBirth: new FormControl(),
      dateOfDeath: new FormControl(),
      dateOfBurial: new FormControl(),
      block: new FormControl(),
      lotCode: new FormControl(),
      familyContactPerson: new FormControl(null, [Validators.required]),
      familyContactNumber: new FormControl(null, [Validators.required]),
      user: new FormControl(),
    });
  }

  public setFormValue(value: Reservation) {
    this.reservation = value;
    if(this.form) {
      this.form.controls["reservationCode"].setValue(value?.reservationCode ? value?.reservationCode : "");
      this.form.controls["burialName"].setValue(value?.burialName ? value?.burialName : "");
      this.form.controls["dateTime"].setValue(value?.dateTime ? moment(value?.dateTime).format("dddd, MMM DD, YYYY") : "");
      this.form.controls["dateOfBirth"].setValue(value?.dateOfBirth ? moment(value?.dateOfBirth).format("MMM DD, YYYY") : "");
      this.form.controls["dateOfDeath"].setValue(value?.dateOfDeath ? moment(value?.dateOfDeath).format("MMM DD, YYYY") : "");
      this.form.controls["dateOfBurial"].setValue(value?.dateOfBurial ? moment(value?.dateOfBurial).format("MMM DD, YYYY") : "");
      this.form.controls["familyContactPerson"].setValue(value?.familyContactPerson ? value?.familyContactPerson : "");
      this.form.controls["familyContactNumber"].setValue(value?.familyContactNumber ? value?.familyContactNumber : "");
      this.form.controls["block"].setValue(value?.lot?.block ? value?.lot?.block : "");
      this.form.controls["lotCode"].setValue(value?.lot?.lotCode ? value?.lot?.lotCode : "");
      this.form.controls["user"].setValue(value?.user?.fullName ? value?.user?.fullName : "");
    }
  }

  public get getFormData() {
    return this.form.value;
  }

  public get valid() {
    return this.form.valid;
  }

  public get ready() {
    return this.form.valid;
  }

  getError(key: string) {
    return this.form.controls && this.form.controls[key] ? this.form.controls[key].errors : null;
  }
}
