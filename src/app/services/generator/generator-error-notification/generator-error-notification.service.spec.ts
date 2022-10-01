import { TestBed } from '@angular/core/testing';

import { GeneratorErrorNotificationService } from './generator-error-notification.service';

describe('GeneratorErrorNotificationService', () => {
  let service: GeneratorErrorNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratorErrorNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
