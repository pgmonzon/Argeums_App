import { Injectable } from '@angular/core';
import { global } from '../global/global';
import { api } from '../global/Api';
import { Unidad } from '../models/unidad';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class UnidadService {

  public url: string;
  public api: string;
  private headers= new Headers({'Content-Type':'application/x-www-form-urlencoded'});

  constructor(private _http: Http) { 
    this.url = global.url;
    this.api = api.API_ClienteID;

  }


  getAll(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'unidades/-unidad/9999',{"tipo_unidad": ""} ,{headers: this.headers})
                    .map(res => res.json());
  }



  crear(tipo_unidad,token) {
    const params = {"api_clienteID":  this.api };
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'unidad', tipo_unidad, {headers: this.headers})
                    .map(res => res.json());
  }


  desabilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'unidadDeshabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }


  habilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'unidadHabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }
  
  eliminar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.delete(this.url + 'unidad/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  recuperar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'unidadRecuperar/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  getId(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'unidad/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  editar(tipo_unidad,token,id){
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'unidad/'+id, tipo_unidad, {headers: this.headers})
                    .map(res => res.json());
  }

}
