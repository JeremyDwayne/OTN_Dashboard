import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Consortium } from './consortium';
import { Institution } from '../institution/institution';

@Injectable()
export class ConsortiumService {
  headers: Headers;
  options: RequestOptions;
  private consortiaUrl = "http://localhost:3000/api/v1/consortia";
  private institutionsUrl = "http://localhost:3000/api/v1/institutions";

  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
  }

  getConsortia(): Observable<Consortium[]> {
    return this.http.get(this.consortiaUrl).map((response: Response) => <Consortium[]>response.json())
  }

  getConsortium(slug: string, id: number) {
    let cons_id = id ? id : slug;
    return this.http.get(this.consortiaUrl + '/' + cons_id + '.json')
  }

  createConsortium(consortium: Consortium): Observable<Consortium> {
    console.log(consortium)
    return this.http.post(this.consortiaUrl, JSON.stringify(consortium), this.options).map((res: Response) => res.json());
  }
}
