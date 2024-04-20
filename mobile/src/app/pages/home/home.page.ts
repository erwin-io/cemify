/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Style } from '@capacitor/status-bar';
import { IonModal } from '@ionic/angular';
import { Lot } from 'src/app/model/lot.model';
import { LotService } from 'src/app/services/lot.service';
import { StatusBarService } from 'src/app/services/status-bar.service';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { MapBoxComponent } from 'src/app/shared/map-box/map-box.component';
import { BurialService } from 'src/app/services/burial.service';
import { Burial } from 'src/app/model/burial.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  details: Lot;
  @ViewChild('mapBox') mapBox: MapBoxComponent;
  @ViewChild('detailsModal', { static: false }) detailsModal: IonModal;
  @ViewChild('searchModal', { static: false }) searchModal: IonModal;
  searchCtrl = new FormControl();
  burial: Burial[] = [];
  lot: {
    a: Lot[];
    b: Lot[];
    c: Lot[];
    d: Lot[];
    e: Lot[];
  } = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: []
  };
  constructor(
    private lotService: LotService,
    private statusBarService: StatusBarService,
    private burialService: BurialService
  ) {
  }

  get countLot() {
    return Number(this.lot.a.length) + Number(this.lot.b.length) +
    Number(this.lot.c.length) + Number(this.lot.d.length) + Number(this.lot.e.length);
  }

  get countBurial() {
    return this.burial.length;
  }

  ionViewWillEnter(){
    console.log('visited');
    // this.mapBox.ngOnInit();
    // this.mapBox.ngAfterViewInit();
  }

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    await ScreenOrientation.addListener('screenOrientationChange', async (orientation)=> {
      console.log(orientation);
      await this.detailsModal.dismiss();
      let zoom = 1.3;
      if(this.details && this.details?.lotCode && this.details?.lotCode !== '') {
        if((this.details.burial && this.details.burial?.burialCode && this.details.burial?.burialCode !== '') &&
        (orientation.type === 'portrait-primary' || orientation.type === 'portrait-secondary')) {
          this.detailsModal.initialBreakpoint = 0.7;
          zoom = 1;
        } else if((this.details.burial && this.details.burial?.burialCode && this.details.burial?.burialCode !== '') &&
        (orientation.type === 'landscape-primary' || orientation.type === 'landscape-secondary')) {
          this.detailsModal.initialBreakpoint = 1;
          zoom = 2;
        } else if((!this.details.burial || !this.details.burial?.burialCode || this.details.burial?.burialCode === '') &&
        (orientation.type === 'portrait-primary' || orientation.type === 'portrait-secondary')) {
          this.detailsModal.initialBreakpoint = 0.4;
          zoom = 1.3;
        } else if((!this.details.burial || !this.details.burial?.burialCode || this.details.burial?.burialCode === '') &&
        (orientation.type === 'landscape-primary' || orientation.type === 'landscape-secondary')) {
          this.detailsModal.initialBreakpoint = 0.7;
          zoom = 2;
        }
        const { x, y } = this.details?.mapData?.pan;
        this.mapBox.setZoom(zoom);
        // this.mapBox.setPan(x, y);
        await this.detailsModal.present();
      }
    });
  }

  ionViewDidLeave() {
    console.log('leave home');
  }

  ionViewWillLeave() {
    console.log('will leave home');
  }

  async ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    console.log('leave home');
  }

  onSelectChange({ lotCode }) {
    // if(this.searchDetails) {
    //   this.searchDetails.showManageLot = false;
    // }
    this.searchCtrl.setValue(lotCode);
    this.lotService.getByCode(lotCode).subscribe(async res=> {
      this.details = res.data;
      console.log(res.data);
      const orientation = await ScreenOrientation.orientation();
      if((res.data.burial && res.data.burial?.burialCode && res.data.burial?.burialCode !== '') &&
      (orientation.type === 'portrait-primary' || orientation.type === 'portrait-secondary')) {
        this.detailsModal.initialBreakpoint = 0.7;
      } else if((res.data.burial && res.data.burial?.burialCode && res.data.burial?.burialCode !== '') &&
      (orientation.type === 'landscape-primary' || orientation.type === 'landscape-secondary')) {
        this.detailsModal.initialBreakpoint = 1;
      } else if((!res.data.burial || !res.data.burial?.burialCode || res.data.burial?.burialCode === '') &&
      (orientation.type === 'portrait-primary' || orientation.type === 'portrait-secondary')) {
        this.detailsModal.initialBreakpoint = 0.4;
      } else if((!res.data.burial || !res.data.burial?.burialCode || res.data.burial?.burialCode === '') &&
      (orientation.type === 'landscape-primary' || orientation.type === 'landscape-secondary')) {
        this.detailsModal.initialBreakpoint = 0.7;
      }
      await this.detailsModal.present();
      // this.search.searchCtrl.setValue(res.data.lotCode);
      // this.search.canSearch = false;
      // this.search.showMenu = false;
      // this.search.lot = [];
      // this.search.burial = [];
      // if(this.searchDetails && this.searchDetails.showManageLot) {
      //   setTimeout(()=> {
      //     this.searchDetails.showManageLot = false;
      //   }, 500);
      // }
    });
  }

  async onSearchComplete(event) {
    this.searchModal.dismiss();
    if(event) {
      this.details = event;
      this.mapBox.setZoom(1.5);
      this.mapBox.setPan(this.details.mapData?.pan?.x, this.details.mapData?.pan?.y);
      this.mapBox.selectLot(this.details.lotCode, this.details.block);
      this.searchModal.didDismiss.subscribe(async res=> {
        this.detailsModal.present();
      });
    } else {
      this.details = null;
      this.mapBox.clearSelection();
    }
  }

  onFullModalWillPresent() {
    this.statusBarService.modifyStatusBar(Style.Light,'#ffffff');
    console.log('status bar');
  }

  onFullModalWillDismiss() {
    this.statusBarService.modifyStatusBar(Style.Dark,'#004D40');
    console.log('status bar');
    this.lot = {
      a:[],
      b:[],
      c:[],
      d:[],
      e:[],
    };
    this.burial = [];
  }

  onSearchChange(event) {
    const query = event.target.value.toLowerCase();
    console.log(query);
    this.burialService.searchMap(query).subscribe(res=> {
      console.log(res.data);
      this.lot.a = res.data.lot.filter(x=>x.block === 'A');
      this.lot.b = res.data.lot.filter(x=>x.block === 'B');
      this.lot.c = res.data.lot.filter(x=>x.block === 'C');
      this.lot.d = res.data.lot.filter(x=>x.block === 'D');
      this.lot.e = res.data.lot.filter(x=>x.block === 'E');
      this.burial = res.data.burial;
    });
  }
}
