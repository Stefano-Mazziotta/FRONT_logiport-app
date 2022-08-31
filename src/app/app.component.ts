import { Component } from '@angular/core';
import { AppDesktopComponent } from './components/app-desktop/app-desktop.component';
import { AppMobileComponent } from './components/app-mobile/app-mobile.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'logiport-app';

  appDesktopComponent = AppDesktopComponent;
  appMobileComponent = AppMobileComponent;
  
  constructor(

  ) {
    localStorage.setItem('companySelected', "");
  }

  ngOnInit(){
  }

}
