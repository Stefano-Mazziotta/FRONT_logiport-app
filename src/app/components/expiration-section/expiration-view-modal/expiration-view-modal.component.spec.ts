import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirationViewModalComponent } from './expiration-view-modal.component';

describe('ExpirationViewModalComponent', () => {
  let component: ExpirationViewModalComponent;
  let fixture: ComponentFixture<ExpirationViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpirationViewModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpirationViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
