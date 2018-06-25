import { Injectable } from '@angular/core';
import { global } from '../global/global';
import { api } from '../global/Api';
import { Unidad } from '../models/unidad';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FacturacionService {


  public url: string;
  public api: string;
  private headers= new Headers({'Content-Type':'application/x-www-form-urlencoded'});

  constructor(private _http: Http) { 
    this.url = global.url;
    this.api = api.API_ClienteID;

  }

  getAll(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'facturas',{} ,{headers: this.headers})
                    .map(res => res.json());
  }
 //CLIENTE 
  getClienteAll(token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'clientes/-cliente/9999', { "cliente": "" }, { headers: this.headers })
      .map(res => res.json());
  }
  //facturasViajes 
  getViajesFacturasAll(docID,token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'viajesFacturar/'+docID, {}, { headers: this.headers })
      .map(res => res.json());
  }

  crear(factura,token) {
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'factura', factura, {headers: this.headers})
                    .map(res => res.json());
  }

  getViajeExel(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'facturaViajes/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  getAllRangeFecha(token,desde,hasta) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'facturasTraerFechas', {"fechaDesde":desde,"fechaHasta":hasta}, { headers: this.headers })
      .map(res => res.json());
  }
}