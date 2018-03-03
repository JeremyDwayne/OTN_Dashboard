import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Institution } from './institution';

@Injectable()
export class InstitutionService {
  headers: Headers;
  options: RequestOptions;
  private institutionsUrl = "http://localhost:3000/api/v1/institutions";

  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
  }

  getInstitutions(): Observable<Institution[]> {
    return this.http.get(this.institutionsUrl).map((response: Response) => <Institution[]>response.json())
  }

  getInstitution(id: number) {
    return this.http.get(this.institutionsUrl + '/' + id + '.json')
  }

  createInstitution(institution: Institution): Observable<Institution> {
    console.log(institution)
    return this.http.post(this.institutionsUrl, JSON.stringify(institution), this.options).map((res: Response) => res.json());
  }
}
