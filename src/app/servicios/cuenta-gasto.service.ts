import { Injectable } from '@angular/core';
import { global } from '../global/global';
import { api } from '../global/Api';
import { CuentaGasto } from '../models/cuentagasto';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class CuentaGastoService {
  public url: string;
  public api: string;
  private headers= new Headers({'Content-Type':'application/x-www-form-urlencoded'});

  constructor(private _http: Http) { 
    this.url = global.url;
    this.api = api.API_ClienteID;

  }


  getAll(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'cuentaGastos/-cuenta_gasto/9999',{"tipo_unidad": ""} ,{headers: this.headers})
                    .map(res => res.json());
  }



  crear(tipo_unidad,token) {
    const params = {"api_clienteID": "yangee_desarrollo" };
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'cuentaGasto', tipo_unidad, {headers: this.headers})
                    .map(res => res.json());
  }


  desabilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'cuentaGastoDeshabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }


  habilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'cuentaGastoHabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }
  
  eliminar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.delete(this.url + 'cuentaGasto/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  recuperar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'cuentaGastoRecuperar/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  getId(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'cuentaGasto/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  editar(tipo_unidad,token,id){
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'cuentaGasto/'+id, tipo_unidad, {headers: this.headers})
                    .map(res => res.json());
  }
}
