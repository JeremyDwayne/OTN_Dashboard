import { Component } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private _tokenService: Angular2TokenService){
    this._tokenService.init({
      apiBase: 'http://localhost:3000',
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
