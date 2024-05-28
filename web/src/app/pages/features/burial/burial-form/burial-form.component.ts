import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Lot } from 'src/app/model/lot.model';
import { Burial } from 'src/app/model/burial.model';
import { Users } from 'src/app/model/users';
import { SelectUserDialogComponent } from 'src/app/shared/select-user-dialog/select-user-dialog.component';
import { Reservation } from 'src/app/model/reservation.model';
import { getAge } from 'src/app/shared/utility/utility';

@Component({
  selector: 'app-burial-form',
  templateUrl: './burial-form.component.html',
  styleUrls: ['./burial-form.component.scss']
})
export class BurialFormComponent {
  burial!: Burial;
  reservation!: Reservation;
  lot!: Lot;
  assignedStaffUser!: Users;
  form: FormGroup;


  @Input() isNew = false;
  @Input() isReadOnly = false;
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      burialFirstName: new FormControl(null, [Validators.required]),
      burialMiddleName: new FormControl(),
      burialLastName: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      burialAge: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(moment().format("YYYY-MM-DD")),
      dateOfDeath: new FormControl(moment().format("YYYY-MM-DD")),
      dateOfBurial: new FormControl(moment().format("YYYY-MM-DD")),
      block: new FormControl(null),
      lotCode: new FormControl(null, [Validators.required]),
      familyContactPerson: new FormControl(null, [Validators.required]),
      familyContactNumber: new FormControl(null, [Validators.required]),
      assignedStaffUserId: new FormControl()
    });
  }

  public setFormValue(value: Burial) {
    this.burial = value;
    this.lot = value.lot;
    this.reservation = value.reservation;
    this.assignedStaffUser = value.workOrder?.assignedStaffUser;
    if(this.form) {
      this.form.controls["burialFirstName"].setValue(value?.burialFirstName??"");
      this.form.controls["burialMiddleName"].setValue(value?.burialMiddleName??"");
      this.form.controls["burialLastName"].setValue(value?.burialLastName??"");
      this.form.controls["address"].setValue(value?.address??"");
      this.form.controls["burialAge"].setValue(value?.burialAge??"");
      this.form.controls["dateOfBirth"].setValue(this.isReadOnly ? (value.dateOfBirth ? moment(value.dateOfBirth).format("MMMM DD, YYYY") : "") : new Date(value.dateOfBirth));
      this.form.controls["dateOfDeath"].setValue(this.isReadOnly ? (value.dateOfDeath ? moment(value.dateOfDeath).format("MMMM DD, YYYY") : "") : new Date(value.dateOfDeath));
      this.form.controls["dateOfBurial"].setValue(this.isReadOnly ? (value.dateOfBurial ? moment(value.dateOfBurial).format("MMMM DD, YYYY") : "") : new Date(value.dateOfBurial));
      this.form.controls["lotCode"].setValue(value?.lot?.lotCode ? value?.lot?.lotCode : "");
      this.form.controls["block"].setValue(value?.lot?.block ? value?.lot?.block : "");
      this.form.controls["familyContactPerson"].setValue(value?.familyContactPerson ? value?.familyContactPerson : "");
      this.form.controls["familyContactNumber"].setValue(value?.familyContactNumber ? value?.familyContactNumber : "");
      this.form.controls["assignedStaffUserId"].setValue(value?.workOrder?.assignedStaffUser?.userId ? value?.workOrder?.assignedStaffUser?.userId : "");
    }
  }

  public setSelectedLot({ lotCode, block}) {
    this.form.controls["lotCode"].setValue(lotCode);
    this.form.controls["lotCode"].markAllAsTouched();
    this.form.controls["lotCode"].markAsDirty();
    this.form.controls["lotCode"].updateValueAndValidity();
    this.form.controls["block"].setValue(block);
    this.form.controls["block"].markAllAsTouched();
    this.form.controls["block"].markAsDirty();
    this.form.controls["block"].updateValueAndValidity();
  }

  ngOnInit(): void {
    this.form.controls["burialFirstName"].addValidators([Validators.required]);
    this.form.controls["burialLastName"].addValidators([Validators.required]);
    this.form.controls["address"].addValidators([Validators.required]);
    this.form.controls["burialAge"].addValidators([Validators.required]);
    this.form.controls["dateOfBirth"].addValidators([Validators.required]);
    this.form.controls["dateOfDeath"].addValidators([Validators.required]);
    this.form.controls["dateOfBurial"].addValidators([Validators.required]);
    this.form.controls["lotCode"].addValidators([Validators.required]);
    this.form.controls["lotCode"].disable();
    this.form.controls["block"].addValidators([Validators.required]);
    this.form.controls["block"].disable();
    this.form.controls["familyContactPerson"].addValidators([Validators.required]);
    this.form.controls["familyContactNumber"].addValidators([Validators.required]);
    this.form.controls["assignedStaffUserId"].addValidators([Validators.required]);
    this.form.controls["assignedStaffUserId"].disable();
    this.form.updateValueAndValidity();
    this.form.controls["dateOfBirth"].valueChanges.subscribe(async res=> {
      if(this.form.controls["dateOfBirth"].touched) {
        this.form.controls["burialAge"].setValue(getAge(new Date(res)));
      }
    })
  }

  public get getFormData() {
    return {
      burialFirstName: this.form.controls["burialFirstName"].value,
      burialMiddleName: this.form.controls["burialMiddleName"].value,
      burialLastName: this.form.controls["burialLastName"].value,
      address: this.form.controls["address"].value,
      burialAge: this.form.controls["burialAge"].value,
      dateOfBirth: this.form.controls["dateOfBirth"].value,
      dateOfDeath: this.form.controls["dateOfDeath"].value,
      dateOfBurial: this.form.controls["dateOfBurial"].value,
      lotCode: this.form.controls["lotCode"].value,
      familyContactPerson: this.form.controls["familyContactPerson"].value,
      familyContactNumber: this.form.controls["familyContactNumber"].value,
      assignedStaffUserId: this.form.controls["assignedStaffUserId"].value,
    }
  }

  public get valid() {
    return this.form.valid && (!this.form.controls["lotCode"].invalid && this.form.controls["lotCode"].value !== null) &&
     (!this.form.controls["assignedStaffUserId"].invalid && this.form.controls["assignedStaffUserId"].value !== null);
  }

  public get ready() {
    return this.valid && this.form.dirty || this.form.touched;
  }

  getError(key: string) {
    return this.form.controls && this.form.controls[key] ? this.form.controls[key].errors : null;
  }

  getCleanNumberText(value: any) {
    return value && !isNaN(Number(value)) ? Number(value) : 0;
  }

  showSelectLot() {
    // const dialogRef = this.dialog.open(SelectLotDialogComponent, {
    //     disableClose: true,
    //     panelClass: "select-lot-dialog"
    // });
    // dialogRef.componentInstance.selected = {
    //   lotCode: this.lot?.lotCode,
    //   name: this.lot?.name,
    //   selected: true
    // }
    // dialogRef.afterClosed().subscribe((res:Lots)=> {
    //   if(res) {
    //     this.lot = res;
    //     this.form.controls["lotCode"].setValue(res.lotCode);
    //   }
    //   this.form.controls["lotCode"].markAllAsTouched();
    //   this.form.controls["lotCode"].markAsDirty();
    //   this.form.controls["lotCode"].updateValueAndValidity();
    //   this.form.controls["otherCharges"].setValue(0);
    //   this.form.controls["otherCharges"].addValidators([Validators.required]);
    //   this.form.updateValueAndValidity();
    // })

  }

  showSelectStaff() {
    const dialogRef = this.dialog.open(SelectUserDialogComponent, {
        disableClose: true,
        panelClass: "select-lot-dialog"
    });
    dialogRef.componentInstance.selected = {
      userCode: this.assignedStaffUser?.userCode,
      fullName: this.assignedStaffUser?.fullName,
      selected: true
    },
    dialogRef.componentInstance.userType = "STAFF";
    dialogRef.afterClosed().subscribe((res: Users)=> {
      if(res) {
        this.assignedStaffUser = res;
        this.form.controls["assignedStaffUserId"].setValue(res.userId);
      }
      this.form.controls["assignedStaffUserId"].markAllAsTouched();
      this.form.controls["assignedStaffUserId"].markAsDirty();
      this.form.controls["assignedStaffUserId"].updateValueAndValidity();
      this.form.updateValueAndValidity();
    })
  }

}
