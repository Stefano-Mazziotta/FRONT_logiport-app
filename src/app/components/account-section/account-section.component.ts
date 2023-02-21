import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-account-section',
  templateUrl: './account-section.component.html',
  styleUrls: ['./account-section.component.scss']
})
export class AccountSectionComponent {

  constructor(
    private _cookieService: CookieService,
    private _userService: UserService
    ) { }

  public logOut(): void{
    this._cookieService.delete( 'token' , '/' );  
    this._userService.existTokenNewData = false;
  }

}
