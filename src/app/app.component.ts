import { Component } from '@angular/core';
// import { AppDesktopComponent } from './components/app-desktop/app-desktop.component';
// import { AppMobileComponent } from './components/app-mobile/app-mobile.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'logiport-app';
  pxTablet: number = 768;
  currentWidth: number = window.innerWidth;

  isDesktop: boolean = this.currentWidth > this.pxTablet;
  isMobile: boolean = this.currentWidth <= this.pxTablet;
  
  constructor() { localStorage.setItem('companySelected', "");  }

}
