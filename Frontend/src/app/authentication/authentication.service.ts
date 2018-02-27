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
  ) {}

  logIn(email: string, password: string): Observable<Response> {
    return this._tokenService.signIn({
      email: email,
      password: password
    });
  }

  signUp(email: string, password: string): Observable<Response> {
    return this._tokenService.registerAccount({
      email: email,
      password: password,
      passwordConfirmation: password
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
