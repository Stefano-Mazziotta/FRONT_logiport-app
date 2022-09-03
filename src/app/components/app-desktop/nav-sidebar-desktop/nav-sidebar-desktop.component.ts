import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nav-sidebar-desktop',
  templateUrl: './nav-sidebar-desktop.component.html',
  styleUrls: ['./nav-sidebar-desktop.component.scss']
})
export class NavSidebarDesktopComponent implements OnInit {

  existToken$:Observable<boolean>;

  constructor(_userService:UserService) {
    this.existToken$ = _userService.existToken;
  }

  ngOnInit(): void {
  }

}
