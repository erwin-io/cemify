import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialDetailsComponent } from './burial-details.component';

describe('BurialDetailsComponent', () => {
  let component: BurialDetailsComponent;
  let fixture: ComponentFixture<BurialDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurialDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
