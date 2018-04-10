import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from './user';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class UserService {
  headers: Headers = new Headers();
  options: RequestOptions;
  private usersUrl = environment.API + "/users";
  private workshopsUrl = environment.API + "/workshops";
  private adminsUrl = environment.API + "/admins";

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

  getUsers(): Observable<any> {
    return this.http.get(this.usersUrl, this.options).map((response: Response) => <any>response.json())
  }

  getAdmins(): Observable<any> {
    return this.http.get(this.adminsUrl, this.options).map((response: Response) => <any>response.json())
  }

  getAttendees(workshop_id: number): Observable<any> {
    return this.http.get(this.workshopsUrl + '/' + workshop_id + '/attendees', this.options).map((response: Response) => <any>response.json())
  }

  getUser(id: number) {
    return this.http.get(this.usersUrl + '/' + id + '.json', this.options)
  }

  createUser(user: User): Observable<any> {
    return this.http.post(this.usersUrl, JSON.stringify(user), this.options).map((res: Response) => res.json());
  }
}
