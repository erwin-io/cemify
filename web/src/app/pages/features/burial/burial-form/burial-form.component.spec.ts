import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialFormComponent } from './burial-form.component';

describe('BurialFormComponent', () => {
  let component: BurialFormComponent;
  let fixture: ComponentFixture<BurialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurialFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
