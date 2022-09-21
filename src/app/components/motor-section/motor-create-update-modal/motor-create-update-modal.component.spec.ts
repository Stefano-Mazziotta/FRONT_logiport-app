import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorCreateUpdateModalComponent } from './motor-create-update-modal.component';

describe('MotorCreateUpdateModalComponent', () => {
  let component: MotorCreateUpdateModalComponent;
  let fixture: ComponentFixture<MotorCreateUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorCreateUpdateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorCreateUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
