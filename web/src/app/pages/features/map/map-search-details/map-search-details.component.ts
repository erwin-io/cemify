import { LotService } from 'src/app/services/lot.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Lot } from 'src/app/model/lot.model';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-search-details',
  templateUrl: './map-search-details.component.html',
  styleUrls: ['./map-search-details.component.scss']
})
export class MapSearchDetailsComponent {
  @Input() lot: Lot;
  @Input() canManageLot = false;
  showManageLot = false;
  isProcessing = false;
  error;
  @Output() onLotStatusUpdated = new EventEmitter<"AVAILABLE"
  | "UNAVAILABLE">();
  constructor(private LotService: LotService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public router: Router,) {
    console.log(this.canManageLot);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.canManageLot);
  }

  updateStatus(status: "AVAILABLE"
  | "UNAVAILABLE") {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    if(status === "AVAILABLE") {
      dialogData.message = 'Are you sure you want to make it available?';
    } else if(status === "UNAVAILABLE") {
      dialogData.message = 'Are you sure you want to make it unavailable?';
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
      let res = await this.LotService.updateStatus(this.lot?.lotCode, { status }).toPromise();
      if (res.success) {
        this.snackBar.open('Successfully updated!', 'close', {
          panelClass: ['style-success'],
        });
        this.lot = res.data;
        this.onLotStatusUpdated.emit(status);
        this.router.navigate(['/map/']);
        this.isProcessing = false;
        dialogRef.componentInstance.isProcessing = this.isProcessing;
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
