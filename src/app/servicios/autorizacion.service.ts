import { Injectable } from '@angular/core';
import { global } from '../global/global';
import { api } from '../global/Api';
import { Unidad } from '../models/unidad';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AutorizacionService {

  public url: string;
  public api: string;
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private _http: Http) {
    this.url = global.url;
    this.api = api.API_ClienteID;

  }


  getAll(token,estado) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'autorizaciones', { "estado": estado }, { headers: this.headers })
      .map(res => res.json());
  }


  desabilitar(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.put(this.url + 'autorizacionRechazar/' + docID, {}, { headers: this.headers })
      .map(res => res.json());
  }


  AutorizacionAutorizar(docID, token, importe) {
    this.headers.set('Authorization', token)
    return this._http.put(this.url + 'autorizacionAutorizar/' + docID, {"importe": importe}, { headers: this.headers })
      .map(res => res.json());
  }



  getId(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.get(this.url + 'autorizacion/' + docID, { headers: this.headers })
      .map(res => res.json());
  }

}

