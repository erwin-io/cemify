import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialReportsComponent } from './burial-reports.component';

describe('BurialReportsComponent', () => {
  let component: BurialReportsComponent;
  let fixture: ComponentFixture<BurialReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurialReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurialReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
