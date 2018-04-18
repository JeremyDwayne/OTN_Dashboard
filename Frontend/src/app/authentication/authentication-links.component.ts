import { Component } from '@angular/core';

import { Angular2TokenService } from 'angular2-token';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'auth-links',
  template: `
    <form class="form-inline my-2 my-lg-0" action="#">
      <small *ngIf="_tokenService.userSignedIn(); else noUser">Welcome {{ _tokenService.currentUserData?.first_name }} {{ _tokenService.currentUserData?.last_name }}!</small>
      <ng-template #noUser><small>Please Login or Signup!</small></ng-template>
      &nbsp;

      <div class="form-group btn-group">
        <button class="form-control btn btn-outline-success" routerLink="/login" routerLinkActive="active" *ngIf="isLoggedOut()">Login</button>
        <button class="form-control btn btn-outline-warning" *ngIf="isLoggedIn()" (click)="logOut()" >Logout</button>
      </div>
    </form>
  `
})
export class AuthenticationLinksComponent {
  constructor(
    public _tokenService: Angular2TokenService,
    private authService: AuthenticationService
  ){}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isLoggedOut(): boolean {
    return !this.authService.isLoggedIn();
  }

  logOut(): void {
    this.authService.logOut();
  }
}
