import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Dashboard } from './dashboard';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class DashboardService {
  headers: Headers = new Headers();
  options: RequestOptions;
  private dashboardUrl = environment.API + "/";

  constructor(
    private http: Http,
    private _tokenService: Angular2TokenService
  ) {
    this.headers.append('Accept','application/json'); 
    if (this._tokenService.currentAuthData != null){
      this.headers.append('access-token', this._tokenService.currentAuthData['accessToken']); 
      this.headers.append('client', this._tokenService.currentAuthData['client']); 
      this.headers.append('uid', this._tokenService.currentAuthData['uid']); 
      this.headers.append('expiry', this._tokenService.currentAuthData['expiry']); 
      this.headers.append('token-type', this._tokenService.currentAuthData['tokenType']);
    }
    this.options = new RequestOptions({headers: this.headers});
  }

  getDashboard(): Observable<Dashboard> {
    return this.http.get(this.dashboardUrl, this.options).map((response: Response) => <Dashboard>response.json())
  }

}
