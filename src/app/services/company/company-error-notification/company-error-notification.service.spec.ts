import { TestBed } from '@angular/core/testing';

import { CompanyErrorNotificationService } from './company-error-notification.service';

describe('CompanyErrorNotificationService', () => {
  let service: CompanyErrorNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyErrorNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
