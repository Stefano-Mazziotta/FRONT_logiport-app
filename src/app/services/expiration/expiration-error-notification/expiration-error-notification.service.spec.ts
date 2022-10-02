import { TestBed } from '@angular/core/testing';

import { ExpirationErrorNotificationService } from './expiration-error-notification.service';

describe('ExpirationErrorNotificationService', () => {
  let service: ExpirationErrorNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpirationErrorNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
