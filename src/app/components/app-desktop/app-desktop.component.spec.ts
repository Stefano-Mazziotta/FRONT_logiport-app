import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDesktopComponent } from './app-desktop.component';

describe('AppDesktopComponent', () => {
  let component: AppDesktopComponent;
  let fixture: ComponentFixture<AppDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDesktopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
