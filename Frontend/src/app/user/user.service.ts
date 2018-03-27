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
  private usersUrl = "http://localhost:3000/api/v1/users";
  private workshopsUrl = "http://localhost:3000/api/v1/workshops";

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

  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl, this.options).map((response: Response) => <User[]>response.json())
  }

  getAdmins(): Observable<User[]> {
    return this.http.get('http://localhost:3000/api/v1/admins', this.options).map((response: Response) => <User[]>response.json())
  }

  getAttendees(workshop_id: number): Observable<User[]> {
    return this.http.get(this.workshopsUrl + '/' + workshop_id + '/attendees', this.options).map((response: Response) => <User[]>response.json())
  }

  getUser(id: number) {
    return this.http.get(this.usersUrl + '/' + id + '.json', this.options)
  }

  createUser(user: User): Observable<User> {
    console.log(user)
    return this.http.post(this.usersUrl, JSON.stringify(user), this.options).map((res: Response) => res.json());
  }
}
