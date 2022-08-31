import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMobileComponent } from './app-mobile.component';

describe('AppMobileComponent', () => {
  let component: AppMobileComponent;
  let fixture: ComponentFixture<AppMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
