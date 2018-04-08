import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Consortium } from './consortium';
import { Institution } from '../institution/institution';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class ConsortiumService {
  headers: Headers = new Headers();
  options: RequestOptions;
  private consortiaUrl = environment.API + "/consortia";
  private institutionsUrl = environment.API + "/institutions";

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

  getConsortia(): Observable<any> {
    return this.http.get(this.consortiaUrl, this.options).map((response: Response) => <any>response.json())
  }

  getConsortium(slug: string, id: number) {
    let cons_id = id ? id : slug;
    return this.http.get(this.consortiaUrl + '/' + cons_id + '.json', this.options)
  }

  createConsortium(consortium: Consortium): Observable<Consortium> {
    console.log(consortium)
    return this.http.post(this.consortiaUrl, consortium, this.options).map((res: Response) => res.json());
  }

  updateConsortium(consortium: Consortium): Observable<Consortium> {
    return this.http.put(this.consortiaUrl + '/' + consortium.id + '.json', consortium, this.options).map((res: Response) => res.json());
  }
}
