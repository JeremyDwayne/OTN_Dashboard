import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Dashboard } from './dashboard';

@Injectable()
export class DashboardService {
  headers: Headers;
  options: RequestOptions;
  private dashboardUrl = "http://localhost:3000/api/v1/";

  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
  }

  getDashboard(): Observable<Dashboard> {
    return this.http.get(this.dashboardUrl).map((response: Response) => <Dashboard>response.json())
  }

}
