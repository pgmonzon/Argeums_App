import {Injectable} from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { global } from './global/global';
import { api } from './global/Api';
import { User } from './models/user';

@Injectable()
export class LoginService {
  public url: string;
  public api: string;
  public auth='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MjQwNTk3NTYsInBhcyI6IkxJTHJUZnR3TC11ZkJITk4tbUlKZWpfUW1RPT0iLCJ1c3IiOiJkZXYifQ.H63e3TxsL5FCZsb0Rpayjjy4ueW2Gzwhw1L5iufk9Bw';
  public identity;
  public token;
  private headers= new Headers({'Content-Type':'application/x-www-form-urlencoded'});
  constructor(private _http: Http) {
    this.url = global.url;
    this.api = api.API_ClienteID;

  }
  login(user: User) {

    
    const json = JSON.stringify(user);
    console.log(this.auth);
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('authorization', this.auth);
    headers.append('API_ClienteID', this.api);
    const options = new RequestOptions({headers: headers});

    return this._http.post(this.url + 'autorizar', options)
                     .map(res => res.json());
  }


  test4()
  {
    //const json = JSON.stringify();
    //const params = 'json=' + json;
    this.headers.set('Authorization',this.auth)
    return this._http.post(this.url + 'testPostHeader', {"api_clienteID": "yangee_desarrollo" }, {headers: this.headers})
                    .map(res => res.json());
  }


  generateToken(user) { 
    const json = JSON.stringify(user);
    //const params = 'json=' + json;
    this.headers.set('Authorization',this.auth)
    return this._http.post(this.url + 'tokenCliente', json, {headers: this.headers})
                    .map(res => res.json());
  }

  signup(token) {
    console.log(token);
    const params = {"api_clienteID": "yangee_desarrollo" };
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'autorizar', {"api_clienteID": "app_desarrollo" }, {headers: this.headers})
                    .map(res => res.json());
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));

    if (identity != 'undefined') {
      this.identity = identity;
    }else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    const token = localStorage.getItem('token');

    if (token != 'undefined') {
      this.token = token;
    }else {
      this.token = null;
    }

    return this.token;
  }

  register(user_to_register) {
    const json = JSON.stringify(user_to_register);
    const params = 'json=' + json;
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    return this._http.post(this.url + 'user/new', params, {headers: headers})
                    .map(res => res.json());
  }

  update_user(user_to_update) {
    const json = JSON.stringify(user_to_update);
    const params = 'json=' + json + '&authorization=' + this.getToken();
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    return this._http.post(this.url + 'user/edit', params, {headers: headers})
                    .map(res => res.json());
  }
 
}
