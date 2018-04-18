import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Response} from '@angular/http';

import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Observable';

import { AlertService } from '../shared/alert.service';
import { User } from '../user/user';

@Injectable()
export class AuthenticationService {
  redirectUrl: string;

  constructor(
    private _tokenService: Angular2TokenService,
    private router: Router,
    private alertService: AlertService
  ) { }

  logIn(email: string, password: string) {
    this._tokenService.signIn({
      email: email,
      password: password
    }).subscribe(
      res => {
        this.router.navigateByUrl(localStorage.getItem('redirectTo'));
        this.alertService.success(["Successfully logged in!"]);
      },
      error => this.alertService.error(JSON.parse(error._body).errors)
    );
  }

  inviteLogIn(user: User, password: string) {
    this._tokenService.signIn({
      email: user.email,
      password: password
    }).subscribe(
      res => {
        this.router.navigate(['/']);
        this.alertService.success(["Welcome to OTN " + user.first_name + " " + user.last_name + "!"]);
      },
      error => this.alertService.error(JSON.parse(error._body).errors)
    );
  }

  signUp(first_name: string, last_name: string, email: string, password: string, institution_id: string) {
    this._tokenService.registerAccount({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      passwordConfirmation: password,
      institution_id: institution_id
    }).subscribe(
      res => {
        this.router.navigate(['/']);
        this.alertService.success(["Successfully signed up!"]);
      },
      error => this.alertService.error(JSON.parse(error._body).errors)
    );
  }

  logOut(): void {
    this.redirectUrl = undefined;
    this._tokenService.signOut().subscribe(
      res => {
        this.router.navigate(['/']);
        this.alertService.success(["Successfully signed out!"]);
      },
      error => this.alertService.error(JSON.parse(error._body).errors)
    );
  }

  isLoggedIn(): boolean {
    return this._tokenService.userSignedIn();
  }
}
