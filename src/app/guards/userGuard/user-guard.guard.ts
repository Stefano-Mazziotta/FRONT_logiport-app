import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {

  constructor( 
    private _cookieService: CookieService,
    private _userService: UserService,
    private router: Router,
  ){}

  canActivate( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const cookie = this._cookieService.check('token');
    
    this._userService.existTokenNewData = cookie;
    if(!cookie){
      this.router.navigate(['/', 'login']);
    }

    return true;
  }
  
}
