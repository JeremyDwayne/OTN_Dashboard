import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Workshop } from './workshop';
import { Institution } from '../institution/institution';

@Injectable()
export class WorkshopService {
  headers: Headers;
  options: RequestOptions;
  private workshopsUrl = "http://localhost:3000/api/v1/workshops";
  private institutionsUrl = "http://localhost:3000/api/v1/institutions";

  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
  }

  getWorkshops(): Observable<Workshop[]> {
    return this.http.get(this.workshopsUrl).map((response: Response) => <Workshop[]>response.json())
  }

  getWorkshop(id: number) {
    return this.http.get(this.workshopsUrl + '/' + id + '.json')
  }

  createWorkshop(workshop: Workshop): Observable<Workshop> {
    console.log(workshop)
    return this.http.post(this.workshopsUrl, JSON.stringify(workshop), this.options).map((res: Response) => res.json());
  }
}
