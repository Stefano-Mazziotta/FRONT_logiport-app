import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirationCreateUpdateModalComponent } from './expiration-create-update-modal.component';

describe('ExpirationCreateUpdateModalComponent', () => {
  let component: ExpirationCreateUpdateModalComponent;
  let fixture: ComponentFixture<ExpirationCreateUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpirationCreateUpdateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpirationCreateUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
