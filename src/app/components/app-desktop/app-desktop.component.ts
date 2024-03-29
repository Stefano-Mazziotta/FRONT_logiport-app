import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-app-desktop',
  templateUrl: './app-desktop.component.html',
  styleUrls: ['./app-desktop.component.scss']
})
export class AppDesktopComponent {

  existToken$:Observable<boolean>;

  constructor(_userService:UserService) {
    this.existToken$ = _userService.existToken;
  }

}
