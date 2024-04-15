import { TestBed } from '@angular/core/testing';

import { BurialService } from './burial.service';

describe('BurialService', () => {
  let service: BurialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BurialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
