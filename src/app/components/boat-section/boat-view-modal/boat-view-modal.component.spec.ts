import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatViewModalComponent } from './boat-view-modal.component';

describe('BoatPopupViewComponent', () => {
  let component: BoatViewModalComponent;
  let fixture: ComponentFixture<BoatViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
