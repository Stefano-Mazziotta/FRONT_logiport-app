import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _cookieService: CookieService,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService,
  ) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {

    const token = this._cookieService.check('token');
    if (token) {
      this.router.navigate(['/', 'inicio']);
    }
  }

  public onLogin(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    const userDTO = {
      username,
      password
    }

    this._userService.login(userDTO).subscribe({
      next: response => {
        const accessToken = response.data.accessToken;
        this._cookieService.set('token', accessToken);

        this.router.navigate(['/', 'inicio']);
      },
      error: error => {

        if (error.status === 401) {
          this.toastr.error('Usuario o contraseña invalido.', 'Error');
        }

        if (error.status === 500) {
          this.toastr.error('Ah ocurrido un error.', 'Error');
        }

        this.loginForm.reset();

      }
    });

  }

}
