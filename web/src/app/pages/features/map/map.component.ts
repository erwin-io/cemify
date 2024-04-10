import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Access } from 'src/app/model/access.model';
import { Burial } from 'src/app/model/burial.model';
import { Lot } from 'src/app/model/lot.model';
import { AppConfigService } from 'src/app/services/app-config.service';
import { BurialService } from 'src/app/services/burial.service';
import { LotService } from 'src/app/services/lot.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { MapBoxComponent } from 'src/app/shared/map-box/map-box.component';
import { MapSearchComponent } from './map-search/map-search.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  host: {
    class: "page-component"
  }
})
export class MapComponent {
  details: Burial | Lot;
  @ViewChild('mapBox') mapBox: MapBoxComponent;
  @ViewChild('search') search: MapSearchComponent;
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private appconfig: AppConfigService,
    private storageService: StorageService,
    private lotService: LotService,
    private burialService: BurialService,
    private route: ActivatedRoute,
    public router: Router) {
      if(this.route.snapshot.data) {
      }
    }

  onSearchComplete(event: { type: 'lot' | 'burial', data: Burial | Lot }) {
    if(event && event.type && event.data) {
      const { type, data } = event;
      if(type === "lot") {
        this.details = data as Lot;
        this.mapBox.selectLot(this.details.lotCode, this.details.block);
      } else {
        this.details = data as Burial;
        this.mapBox.selectLot(this.details.lot.lotCode, this.details.lot.block);
      }
    } else {
      this.details = null;
      this.mapBox.clearSelection();
    }
  }

  onSelectChange({ lotCode }) {
    this.lotService.getByCode(lotCode).subscribe(res=> {
      this.details = res.data;
      this.search.searchCtrl.setValue(res.data.lotCode);
      this.search.canSearch = false;
      this.search.showMenu = false;
      this.search.lot = [];
      this.search.burial = [];
    });
  }
}
