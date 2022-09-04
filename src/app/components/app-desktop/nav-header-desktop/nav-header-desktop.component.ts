import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nav-header-desktop',
  templateUrl: './nav-header-desktop.component.html',
  styleUrls: ['./nav-header-desktop.component.scss']
})
export class NavHeaderDesktopComponent implements OnInit {

  ngOnInit(): void {
  }

}
