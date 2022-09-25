import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorViewModalComponent } from './motor-view-modal.component';

describe('MotorViewModalComponent', () => {
  let component: MotorViewModalComponent;
  let fixture: ComponentFixture<MotorViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorViewModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
