import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatSelectorComponent } from './boat-selector.component';

describe('BoatSelectorComponent', () => {
  let component: BoatSelectorComponent;
  let fixture: ComponentFixture<BoatSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoatSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
