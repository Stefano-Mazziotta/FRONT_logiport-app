import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nav-bottom-mobile',
  templateUrl: './nav-bottom-mobile.component.html',
  styleUrls: ['./nav-bottom-mobile.component.scss']
})
export class NavBottomMobileComponent implements OnInit {

  existToken$:Observable<boolean>;

  constructor(_userService: UserService) { 
    this.existToken$ = _userService.existToken;
  }

  ngOnInit():void {}

}
