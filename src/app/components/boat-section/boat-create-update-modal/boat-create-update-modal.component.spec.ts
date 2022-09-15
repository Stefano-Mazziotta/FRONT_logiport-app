import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatPopupAddEditComponent } from './boat-popup-add-edit.component';

describe('BoatPopupAddEditComponent', () => {
  let component: BoatPopupAddEditComponent;
  let fixture: ComponentFixture<BoatPopupAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatPopupAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatPopupAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
