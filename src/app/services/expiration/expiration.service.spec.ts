import { TestBed } from '@angular/core/testing';

import { ExpirationService } from './expiration.service';

describe('ExpirationService', () => {
  let service: ExpirationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpirationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
