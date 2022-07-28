import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatPopupViewComponent } from './boat-popup-view.component';

describe('BoatPopupViewComponent', () => {
  let component: BoatPopupViewComponent;
  let fixture: ComponentFixture<BoatPopupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatPopupViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatPopupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
