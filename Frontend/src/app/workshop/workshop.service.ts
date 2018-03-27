import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Workshop } from './workshop';
import { Institution } from '../institution/institution';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class WorkshopService {
  headers: Headers = new Headers();
  options: RequestOptions;
  private workshopsUrl = "http://localhost:3000/api/v1/workshops";
  private institutionsUrl = "http://localhost:3000/api/v1/institutions";

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

  getWorkshops(): Observable<Workshop[]> {
    return this.http.get(this.workshopsUrl, this.options).map((response: Response) => <Workshop[]>response.json())
  }

  getWorkshop(slug: string, id: number) {
    let workshop_id = id ? id : slug;
    return this.http.get(this.workshopsUrl + '/' + workshop_id + '.json', this.options)
  }

  createWorkshop(workshop: Workshop): Observable<Workshop> {
    return this.http.post(this.workshopsUrl, workshop, this.options).map((res: Response) => res.json());
  }

  updateWorkshop(workshop: Workshop): Observable<Workshop> {
    return this.http.put(this.workshopsUrl + '/' + workshop.id + '.json', workshop, this.options).map((res: Response) => res.json());
  }
}
