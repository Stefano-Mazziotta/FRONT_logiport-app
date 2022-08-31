import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSidebarDesktopComponent } from './nav-sidebar-desktop.component';

describe('NavSidebarDesktopComponent', () => {
  let component: NavSidebarDesktopComponent;
  let fixture: ComponentFixture<NavSidebarDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSidebarDesktopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavSidebarDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
