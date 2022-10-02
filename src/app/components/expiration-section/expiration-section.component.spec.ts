import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirationSectionComponent } from './expiration-section.component';

describe('ExpirationSectionComponent', () => {
  let component: ExpirationSectionComponent;
  let fixture: ComponentFixture<ExpirationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpirationSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpirationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
