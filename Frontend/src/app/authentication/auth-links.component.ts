import { Component } from '@angular/core';

import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'auth-links',
  template: `
    <div class="form-group btn-group">
      <button class="form-control btn btn-outline-success" routerLink="/login" routerLinkActive="active" *ngIf="isLoggedOut()">Login</button>
      <button class="form-control btn btn-outline-success" routerLink="/signup" routerLinkActive="active" *ngIf="isLoggedOut()">Sign Up</button>
      <button class="form-control btn btn-outline-warning" routerLink="/logout" (click)="logOut()" *ngIf="isLoggedIn()">Logout</button>
    </div>
  `
})
export class AuthLinksComponent {
  constructor(private authService: AuthenticationService){}

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
