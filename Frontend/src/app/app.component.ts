import { environment } from '../environments/environment';
import { Component } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public isCollapsed: boolean = true;

  constructor(private _tokenService: Angular2TokenService) {
    this._tokenService.init({
      signInStoredUrlStorageKey: 'redirectTo',
      apiBase: environment.API_BASE,
      signInRedirect: '/login',
      globalOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Api-Version': '1'
        }
      }
    });
  }
}
