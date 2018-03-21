import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  redirectUrl: string;

  constructor(
    private _tokenService: Angular2TokenService,
    private router: Router
  ) {
    this._tokenService.init({
      apiPath: 'http://localhost:3000/api/v1',
      globalOptions: {
        headers: {
          'Content-Type':     'application/json',
          'Accept':           'application/json'
        }
      }
    });
  }

  logIn(email: string, password: string): Observable<Response> {
    return this._tokenService.signIn({
      email: email,
      password: password
    });
  }

  signUp(first_name: string, last_name: string, email: string, password: string, institution_id: string): Observable<Response> {
    return this._tokenService.registerAccount({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      passwordConfirmation: password,
      institution_id: institution_id
    });
  }

  logOut(): void {
    this.redirectUrl = undefined;
    this._tokenService.signOut();
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this._tokenService.userSignedIn();
  }

  redirectAfterLogin(): void {
    let redirectTo = this.redirectUrl ? this.redirectUrl : '/';
    this.redirectUrl = undefined;
    this.router.navigate([redirectTo]);
  }
}
