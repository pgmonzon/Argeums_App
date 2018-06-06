import { Injectable } from '@angular/core';
import { global } from '../global/global';
import { api } from '../global/Api';
import { Unidad } from '../models/unidad';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LiquidacionService {

  public url: string;
  public api: string;
  private headers= new Headers({'Content-Type':'application/x-www-form-urlencoded'});

  constructor(private _http: Http) { 
    this.url = global.url;
    this.api = api.API_ClienteID;

  }

  getAll(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'liquidaciones',{} ,{headers: this.headers})
                    .map(res => res.json());
  }
 //TRASNPORTISTA_ID
 getTransportistaAll(token) {
  this.headers.set('Authorization', token)
  return this._http.post(this.url + 'transportistas/-transportista/9999', { "transportista": "" }, { headers: this.headers })
    .map(res => res.json());
}
  //facturasViajes 
  getViajesLiquidarsAll(docID,token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'viajesLiquidar/'+docID, {}, { headers: this.headers })
      .map(res => res.json());
  }

  crear(liquidacion,token) {
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'liquidacion', liquidacion, {headers: this.headers})
                    .map(res => res.json());
  }


}
