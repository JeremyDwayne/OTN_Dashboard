import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from './user';

@Injectable()
export class UserService {
  headers: Headers;
  options: RequestOptions;
  private usersUrl = "http://localhost:3000/api/v1/users";
  private workshopsUrl = "http://localhost:3000/api/v1/workshops";

  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl).map((response: Response) => <User[]>response.json())
  }
  
  getAttendees(workshop_id: number): Observable<User[]> {
    return this.http.get(this.workshopsUrl + '/' + workshop_id + '/attendees').map((response: Response) => <User[]>response.json())
  }

  getUser(id: number) {
    return this.http.get(this.usersUrl + '/' + id + '.json')
  }

  createUser(user: User): Observable<User> {
    console.log(user)
    return this.http.post(this.usersUrl, JSON.stringify(user), this.options).map((res: Response) => res.json());
  }
}
