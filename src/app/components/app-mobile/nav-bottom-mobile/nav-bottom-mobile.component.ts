import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nav-bottom-mobile',
  templateUrl: './nav-bottom-mobile.component.html',
  styleUrls: ['./nav-bottom-mobile.component.scss']
})
export class NavBottomMobileComponent{

  existToken$:Observable<boolean>;

  constructor(_userService: UserService) { 
    this.existToken$ = _userService.existToken;
  }

}
