import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Access, AccessPages } from 'src/app/model/access.model';
import { Burial } from 'src/app/model/burial.model';
import { Lot } from 'src/app/model/lot.model';
import { AppConfigService } from 'src/app/services/app-config.service';
import { BurialService } from 'src/app/services/burial.service';
import { LotService } from 'src/app/services/lot.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { MapBoxComponent } from 'src/app/shared/map-box/map-box.component';
import { MapSearchDetailsComponent } from './map-search-details/map-search-details.component';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  host: {
    class: "page-component"
  }
})
export class MapComponent {
  details: Lot;
  @ViewChild('mapBox') mapBox: MapBoxComponent;
  // @ViewChild('search') search: MapSearchComponent;
  @ViewChild('searchDetails') searchDetails: MapSearchDetailsComponent;
  @ViewChild('searchDialog', { static: true }) searchDialogTemplate: TemplateRef<any>;
  searchDialog: MatDialogRef<any, any>

  pageAccess: AccessPages = {
    view: true,
    modify: false,
  } as any;

  searchCtrl = new FormControl();
  burial: Burial[] = [];
  lot: {
    a: Lot[],
    b: Lot[],
    c: Lot[],
    d: Lot[],
    e: Lot[]
  } = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: []
  }
  canSearch = false;
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
        this.pageAccess = {
          ...this.pageAccess,
          ...this.route.snapshot.data["access"]
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

  onSearchComplete(event) {
    this.searchDialog.close();
    this.canSearch = false;
    if(this.searchDetails) {
      this.searchDetails.showManageLot = false;
    }
    if(event) {
      this.details = event;
      this.mapBox.selectLot(this.details.lotCode, this.details.block);
      if(this.searchDetails && this.searchDetails.showManageLot) {
        setTimeout(()=> {
          this.searchDetails.showManageLot = false;
        }, 500);
      }
    } else {
      this.details = null;
      this.mapBox.clearSelection();
    }
  }

  onSelectChange({ lotCode }) {
    this.canSearch = true;
    if(this.searchDetails) {
      this.searchDetails.showManageLot = false;
    }
    this.lotService.getByCode(lotCode).subscribe(res=> {
      this.details = res.data;
      this.searchCtrl.setValue(lotCode);
      // this.lot = {
      //   a:[],
      //   b:[],
      //   c:[],
      //   d:[],
      //   e:[],
      // };
      // this.burial = [];
      if(this.searchDetails && this.searchDetails.showManageLot) {
        setTimeout(()=> {
          this.searchDetails.showManageLot = false;
        }, 500);
      }
    });
  }

  onOpenSearchDialog() {
    this.canSearch = true;
    this.searchDialog = this.dialog.open(this.searchDialogTemplate, {
      width: "100%",
      maxWidth: 400,
    });
    if(!this.searchCtrl.touched && this.searchCtrl.value && this.searchCtrl.value !== "") {
      this.search(this.searchCtrl.value.toString())
    }
    this.searchCtrl.valueChanges.pipe(debounceTime(1000)).subscribe(res=> {
      if(res && res !== "" && this.canSearch) {
        this.search(res.toString())
      }
    });
  }

  search(key) {
    this.burialService.searchMap(key).subscribe(res=> {
      console.log(res.data);
      this.lot["a"] = res.data.lot.filter(x=>x.block === "A");
      this.lot["b"] = res.data.lot.filter(x=>x.block === "B");
      this.lot["c"] = res.data.lot.filter(x=>x.block === "C");
      this.lot["d"] = res.data.lot.filter(x=>x.block === "D");
      this.lot["e"] = res.data.lot.filter(x=>x.block === "E");
      this.burial = res.data.burial;
    });
  }
}
