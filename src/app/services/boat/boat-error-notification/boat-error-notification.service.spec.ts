import { TestBed } from '@angular/core/testing';

import { BoatErrorNotificationService } from './boat-error-notification.service';

describe('BoatErrorNotificationService', () => {
  let service: BoatErrorNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoatErrorNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
