import { Component, Input } from '@angular/core';
import { Lot } from 'src/app/model/lot.model';

@Component({
  selector: 'app-map-search-details',
  templateUrl: './map-search-details.component.html',
  styleUrls: ['./map-search-details.component.scss']
})
export class MapSearchDetailsComponent {
  @Input() lot: Lot;
  constructor() {

  }
}
