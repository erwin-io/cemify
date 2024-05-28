/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Lot } from 'src/app/model/lot.model';
import { Users } from 'src/app/model/users';
import { LotService } from 'src/app/services/lot.service';
import { MapBoxComponent } from 'src/app/shared/map-box/map-box.component';

@Component({
  selector: 'app-pick-lot',
  templateUrl: './pick-lot.component.html',
  styleUrls: ['./pick-lot.component.scss'],
})
export class PickLotComponent implements OnInit {
  config: {mode?: 'NAVIGATE' | 'PICK'; disableSelection?: boolean } = { mode: 'NAVIGATE', disableSelection: true };
  modal;
  currentUser: Users;
  selectedLot: Lot;
  selectedLotLoading = false;

  @ViewChild('mapBox') mapBox: MapBoxComponent;
  @ViewChild('detailsModal', { static: false }) detailsModal: IonModal;
  constructor(
    private lotService: LotService) { }

  ngOnInit() {
  }

  onMapLoadComplete() {
    if(this.selectedLot && this.selectedLot.lotCode && this.selectedLot.lotCode !== '') {
      this.mapBox.setZoom(1.5);
      this.mapBox.setPan(this.selectedLot.mapData?.pan?.x, this.selectedLot.mapData?.pan?.y);
      this.mapBox.selectLot(this.selectedLot.lotCode, this.selectedLot.block);
      // if(!this.config.disableSelection) {
      //   this.detailsModal.present();
      // }
    }
  }


  onSelectLotChange({ lotCode }) {
    // if(this.searchDetails) {
    //   this.searchDetails.showManageLot = false;
    // }
    this.selectedLotLoading = true;
    this.lotService.getByCode(lotCode).subscribe(async res=> {
      this.selectedLot = res.data;
      this.selectedLotLoading = false;
    });
  }
}
