import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { debounce, debounceTime } from 'rxjs';
import { Burial } from 'src/app/model/burial.model';
import { Lot } from 'src/app/model/lot.model';
import { BurialService } from 'src/app/services/burial.service';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss']
})
export class MapSearchComponent {
  @Output() onSearchComplete = new EventEmitter<Lot>();
  searchCtrl = new FormControl();
  canSearch = false;
  isSearching = false;
  showMenu = false;
  showSpinner = false;
  lot: Lot[] = [];
  burial: Burial[] = [];
  constructor(
    private elementRef: ElementRef,
    private lotService: LotService,
    private burialService: BurialService,
    private spinner: SpinnerVisibilityService) {

    this.searchCtrl.valueChanges.pipe(debounceTime(1000)).subscribe(res=> {
      if(res && res !== "" && !this.isSearching && this.canSearch) {
        this.showSpinner = true;
        this.spinner.hide();
        this.burialService.searchMap(res.toLowerCase()).subscribe(res=> {
          this.showMenu = true;
          if(res.data && res.data.burial) {
            this.burial = res.data.burial;
          }
          if(res.data && res.data.lot) {
            this.lot = res.data.lot;
          }
          if(this.burial.length === 0 && this.lot.length === 0) {
            this.showMenu = false;
          }
          this.showSpinner = false;
        })
      }
    })
  }

  search(type: 'burial' | 'lot', item: Burial | Lot) {
    this.isSearching = true;
    this.showMenu = false;
    this.showSpinner = true;
    if(type === "burial") {
      this.searchCtrl.setValue(item["fullName"]);
      this.spinner.hide();
      this.burialService.getByCode(item["burialCode"]).subscribe(res=> {
        console.log(res.data);
        const lot = res.data.lot;
        lot.burial = res.data;
        delete lot.burial.lot;
        this.onSearchComplete.emit(lot);
        this.showSpinner = false;
      })
    } else {
      this.searchCtrl.setValue(item["lotCode"]);
      this.spinner.hide();
      this.lotService.getByCode(item["lotCode"]).subscribe(res=> {
        console.log(res.data);
        this.onSearchComplete.emit(res.data);
        this.showSpinner = false;
      })
    }
  }

  onFocus() {
    this.isSearching = false;
    if(this.searchCtrl.value && this.searchCtrl.value !== "" && this.canSearch === true) {
      this.showMenu = true;
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if(!this.elementRef.nativeElement.contains(event.target)) {
      this.showMenu = false;
    }
  }
}
