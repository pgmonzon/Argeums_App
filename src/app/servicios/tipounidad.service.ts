import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { global } from '../global/global';
import { api } from '../global/Api';
import { tipounidad } from '../models/tipounidad';


@Injectable()
export class TipounidadService {
  public url: string;
  public api: string;
  private headers= new Headers({'Content-Type':'application/x-www-form-urlencoded'});

  constructor(private _http: Http) { 
    this.url = global.url;
    this.api = api.API_ClienteID;

  }


  getAll(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'tipoUnidades/-tipo_unidad/9999',{"tipo_unidad": ""} ,{headers: this.headers})
                    .map(res => res.json());
  }



  crear(tipo_unidad,token) {
    const params = {"api_clienteID": "yangee_desarrollo" };
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'tipoUnidad', tipo_unidad, {headers: this.headers})
                    .map(res => res.json());
  }


  desabilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'tipoUnidadDeshabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }


  habilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'tipoUnidadHabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }
  
  eliminar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.delete(this.url + 'tipoUnidad/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  recuperar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'tipoUnidadRecuperar/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  gettipounidad(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'tipoUnidad/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  editar(tipo_unidad,token,id){
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'tipoUnidad/'+id, tipo_unidad, {headers: this.headers})
                    .map(res => res.json());
  }
}
