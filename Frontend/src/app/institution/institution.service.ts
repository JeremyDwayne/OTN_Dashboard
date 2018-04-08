import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Institution } from './institution';
import { User } from '../user/user';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class InstitutionService {
  headers: Headers = new Headers();
  options: RequestOptions;
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

  getInstitutions(): Observable<any> {
    return this.http.get(this.institutionsUrl, this.options).map((response: Response) => <any>response.json())
  }
  
  getFacilitators(slug: string, id: number): Observable<any>{
    let inst_id = id ? id : slug;
    console.log(inst_id);
    return this.http.get(this.institutionsUrl + '/' + inst_id + '/facilitators', this.options).map((response: Response) => <User[]>response.json())
  }

  getInstitution(slug: string, id: number) {
    let inst_id = id ? id : slug;
    return this.http.get(this.institutionsUrl + '/' + inst_id + '.json', this.options)
  }

  createInstitution(institution: Institution): Observable<Institution> {
    return this.http.post(this.institutionsUrl, institution, this.options).map((res: Response) => res.json());
  }

  updateInstitution(institution: Institution): Observable<Institution> {
    return this.http.put(this.institutionsUrl + '/' + institution.id + '.json', institution, this.options).map((res: Response) => res.json());
  }
}
