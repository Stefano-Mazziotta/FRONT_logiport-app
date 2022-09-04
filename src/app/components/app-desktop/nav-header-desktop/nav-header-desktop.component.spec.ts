import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHeaderDesktopComponent } from './nav-header-desktop.component';

describe('NavSidebarDesktopComponent', () => {
  let component: NavHeaderDesktopComponent;
  let fixture: ComponentFixture<NavHeaderDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavHeaderDesktopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavHeaderDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
