import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSearchDetailsComponent } from './map-search-details.component';

describe('MapSearchDetailsComponent', () => {
  let component: MapSearchDetailsComponent;
  let fixture: ComponentFixture<MapSearchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapSearchDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapSearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
