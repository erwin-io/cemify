import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Users } from 'src/app/model/users';
import { WorkOrder } from 'src/app/model/work-order.model';
import { SelectUserDialogComponent } from 'src/app/shared/select-user-dialog/select-user-dialog.component';

@Component({
  selector: 'app-work-order-form',
  templateUrl: './work-order-form.component.html',
  styleUrls: ['./work-order-form.component.scss']
})
export class WorkOrderFormComponent {
  workOrder!: WorkOrder;
  assignedStaffUser: Users;
  form: FormGroup;
  @Input() isReadOnly = false;
  @Input() isNew = false;
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      workOrderCode: new FormControl(),
      dateTargetCompletion: new FormControl(new Date(), [Validators.required]),
      type: new FormControl(),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      assignedStaffUserCode: new FormControl(null, [Validators.required]),
    });
  }

  public setFormValue(value: WorkOrder) {
    this.workOrder = value;
    this.assignedStaffUser = value?.assignedStaffUser;
    if(this.form) {
      this.form.controls["workOrderCode"].setValue(value?.workOrderCode ? value?.workOrderCode : "");
      this.form.controls["dateTargetCompletion"].setValue(value?.dateTargetCompletion ? value?.dateTargetCompletion : "");
      this.form.controls["title"].setValue(value?.title ? value?.title : "");
      this.form.controls["description"].setValue(value?.description ? value?.description : "");
      this.form.controls["type"].setValue(value?.type ? value?.type : "");
      this.form.controls["assignedStaffUserCode"].setValue(value?.assignedStaffUser?.userCode ? value?.assignedStaffUser?.userCode : "");
    }
  }

  public get getFormData() {
    return {
      dateTargetCompletion: this.form.controls["dateTargetCompletion"].value,
      title: this.form.controls["title"].value,
      description: this.form.controls["description"].value,
      assignedStaffUserCode: this.form.controls["assignedStaffUserCode"].value,
    };
  }

  public get valid() {
    return (this.form.controls["dateTargetCompletion"].valid
    && this.form.controls["title"].valid
    && this.form.controls["description"].valid
    && this.form.controls["assignedStaffUserCode"].valid
    );
  }

  public get ready() {
    return this.valid && (this.form.controls["dateTargetCompletion"].dirty
    || this.form.controls["title"].dirty
    || this.form.controls["description"].dirty
    || this.form.controls["assignedStaffUserCode"].dirty
    ) && (this.form.controls["dateTargetCompletion"].touched
    || this.form.controls["title"].touched
    || this.form.controls["description"].touched
    || this.form.controls["assignedStaffUserCode"].touched
    );
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
        this.form.controls["assignedStaffUserCode"].setValue(res.userCode);
      }
      this.form.controls["assignedStaffUserCode"].markAllAsTouched();
      this.form.controls["assignedStaffUserCode"].markAsDirty();
      this.form.controls["assignedStaffUserCode"].updateValueAndValidity();
      this.form.updateValueAndValidity();
    })
  }

  getError(key: string) {
    return this.form.controls && this.form.controls[key] ? this.form.controls[key].errors : null;
  }
}
