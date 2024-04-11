import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/model/users';
import { PusherService } from 'src/app/services/pusher.service';
import { AccessPages } from 'src/app/model/access.model';
import { WorkOrder } from 'src/app/model/work-order.model';
import { MapBoxComponent } from 'src/app/shared/map-box/map-box.component';
import { WorkOrderService } from 'src/app/services/work-order.service';
import { WorkOrderFormComponent } from '../work-order-form/work-order-form.component';
import { ApiResponse } from 'src/app/model/api-response.model';
@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.scss'],
  host: {
    class: "page-component"
  }
})
export class WorkOrderDetailsComponent {
  currentUserProfile:Users;
  workOrderCode;
  isNew = false;
  isReadOnly = true;
  error;
  isLoading = true;

  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  isLoadingRoles = false;

  @ViewChild('workOrderForm', { static: true}) workOrderForm: WorkOrderFormComponent;

  canAddEdit = false;

  workOrder: WorkOrder;

  pageAccess: AccessPages = {
    view: true,
    modify: false,
  } as any;

  constructor(
    private workOrderService: WorkOrderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private appconfig: AppConfigService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private pusherService: PusherService
  ) {
    this.currentUserProfile = this.storageService.getLoginProfile();
    const { isNew, edit } = this.route.snapshot.data;
    this.isNew = isNew;
    this.workOrderCode = this.route.snapshot.paramMap.get('workOrderCode');
    this.isReadOnly = !edit && !isNew;
    if (this.route.snapshot.data) {
      this.pageAccess = {
        ...this.pageAccess,
        ...this.route.snapshot.data['access'],
      };
    }
  }

  get pageRights() {
    let rights = {};
    for(var right of this.pageAccess.rights) {
      rights[right] = this.pageAccess.modify;
    }
    return rights;
  }

  ngOnInit(): void {
    const channel = this.pusherService.init(this.currentUserProfile.userId);
    channel.bind('rentBookingChanges', (res: WorkOrder) => {
      console.log(res);
      if(res.workOrderId === this.workOrder.workOrderId) {
        this.snackBar.open("Someone has updated this document.", "",{
          announcementMessage: "Someone has updated this document.",
          verticalPosition: "top"
        });
        setTimeout(()=> {
          if(this.isReadOnly) {
            this.initDetails();
          }
        }, 3000);
      }
    });
  }

  async ngAfterViewInit() {
    // await Promise.all([
    // ])
    if(!this.isNew) {
      this.canAddEdit = !this.isReadOnly;
      this.initDetails();
    } else {
      this.canAddEdit = true;
      this.isLoading = false;
    }
  }

  initDetails() {
    this.isLoading = true;
    try {
      this.workOrderService.getByCode(this.workOrderCode).subscribe(res=> {
        if (res.success) {
          this.workOrder = res.data;
          this.workOrderForm.setFormValue(this.workOrder);

          if (this.isReadOnly) {
            this.workOrderForm.form.disable();
          }
          if(!this.isReadOnly && (this.workOrder.status !== "PENDING" || this.workOrder?.type === 'BURIAL')) {
            this.router.navigate(['/work-order/' + this.workOrderCode + '/details']);
          }
          if(!this.pageRights['Status'] && this.workOrder.assignedStaffUser?.userCode !== this.currentUserProfile?.userCode) {
            this.router.navigate(['/work-order/']);
          }
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(res.message) ? res.message[0] : res.message;
          this.snackBar.open(this.error, 'close', {
            panelClass: ['style-error'],
          });
          this.router.navigate(['/work-order/']);
        }
      });
    } catch(ex) {
      this.error = Array.isArray(ex.message) ? ex.message[0] : ex.message;
      this.snackBar.open(this.error, 'close', {
        panelClass: ['style-error'],
      });
      this.router.navigate(['/work-order/']);
      this.isLoading = false;
    }
  }

  onSubmit() {
    const formData = this.workOrderForm?.getFormData;
    console.log(formData);
    if(!this.workOrderForm.valid) {
      this.workOrderForm.form.markAsDirty();
      this.workOrderForm.form.markAsTouched();
      this.workOrderForm.form.updateValueAndValidity();
      return;
    }
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Save work order?';
    dialogData.confirmButton = {
      visible: true,
      text: 'yes',
      color: 'primary',
    };
    dialogData.dismissButton = {
      visible: true,
      text: 'cancel',
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: '400px',
      closeOnNavigation: true,
    });
    dialogRef.componentInstance.alertDialogConfig = dialogData;

    dialogRef.componentInstance.conFirm.subscribe(async (data: any) => {
      this.isProcessing = true;
      dialogRef.componentInstance.isProcessing = this.isProcessing;
      try {
        let res: ApiResponse<WorkOrder>;
        if(this.isNew) {
          res = await this.workOrderService.create(formData).toPromise();
        } else {
          res = await this.workOrderService.update(this.workOrderCode, formData).toPromise();
        }
        if (res.success) {
          this.snackBar.open('Saved!', 'close', {
            panelClass: ['style-success'],
          });
          this.router.navigate(['/work-order/' + res.data.workOrderCode + '/details']);
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          this.workOrderCode = res.data.workOrderCode;
          this.workOrder = res.data;
          this.isReadOnly = true;
          this.isNew = false;
          this.canAddEdit = true;
          await this.ngAfterViewInit();
          dialogRef.close();
        } else {
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          this.error = Array.isArray(res.message)
            ? res.message[0]
            : res.message;
          this.snackBar.open(this.error, 'close', {
            panelClass: ['style-error'],
          });
          dialogRef.close();
        }
      } catch (e) {
        this.isProcessing = false;
        dialogRef.componentInstance.isProcessing = this.isProcessing;
        this.error = Array.isArray(e.message) ? e.message[0] : e.message;
        this.snackBar.open(this.error, 'close', {
          panelClass: ['style-error'],
        });
        dialogRef.close();
      }
    });
  }

  updateStatus(status: "INPROGRESS"
  | "COMPLETED"
  | "CANCELLED") {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    if(status === "CANCELLED") {
      dialogData.message = 'Are you sure you want to cancel work order?';
    } else if(status === "INPROGRESS") {
      dialogData.message = 'Are you sure you want to mark this work order as in progress?';
    } else if(status === "COMPLETED") {
      dialogData.message = 'Are you sure you want to complete work order?';
    }
    dialogData.confirmButton = {
      visible: true,
      text: 'yes',
      color: 'primary',
    };
    dialogData.dismissButton = {
      visible: true,
      text: 'cancel',
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: '400px',
      closeOnNavigation: true,
    });
    dialogRef.componentInstance.alertDialogConfig = dialogData;


    dialogRef.componentInstance.conFirm.subscribe(async (data: any) => {

    this.isProcessing = true;
    dialogRef.componentInstance.isProcessing = this.isProcessing;
    try {
      let res = await this.workOrderService.updateStatus(this.workOrderCode, { status }).toPromise();
      if (res.success) {
        this.snackBar.open('Successfully updated!', 'close', {
          panelClass: ['style-success'],
        });
        this.router.navigate(['/work-order/' + this.workOrderCode + '/details']);
        this.isProcessing = false;
        dialogRef.componentInstance.isProcessing = this.isProcessing;
        await this.ngAfterViewInit();
        dialogRef.close();
        this.dialog.closeAll();
      } else {
        this.isProcessing = false;
        dialogRef.componentInstance.isProcessing = this.isProcessing;
        this.error = Array.isArray(res.message)
          ? res.message[0]
          : res.message;
        this.snackBar.open(this.error, 'close', {
          panelClass: ['style-error'],
        });
        dialogRef.close();
      }
    } catch (e) {
      this.isProcessing = false;
      dialogRef.componentInstance.isProcessing = this.isProcessing;
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.snackBar.open(this.error, 'close', {
        panelClass: ['style-error'],
      });
      dialogRef.close();
    }
    });
  }
}
