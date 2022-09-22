import { TestBed } from '@angular/core/testing';

import { MotorErrorNotificationService } from './motor-error-notification.service';

describe('MotorErrorNotificationService', () => {
  let service: MotorErrorNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotorErrorNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
