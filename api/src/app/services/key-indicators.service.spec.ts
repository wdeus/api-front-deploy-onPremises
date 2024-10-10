import { TestBed } from '@angular/core/testing';

import { KeyIndicatorsService } from './key-indicators.service';

describe('KeyIndicatorsService', () => {
  let service: KeyIndicatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyIndicatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
