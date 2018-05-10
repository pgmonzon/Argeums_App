import { Injectable } from '@angular/core';
import { global } from '../global/global';
import { api } from '../global/Api';
import { personal } from '../models/personal';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class PersonalService {
  public url: string;
  public api: string;
  private headers= new Headers({'Content-Type':'application/x-www-form-urlencoded'});

  constructor(private _http: Http) { 
    this.url = global.url;
    this.api = api.API_ClienteID;

  }


  getAll(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'personales/-nombre/9999',{"apellido": "","nombre": ""} ,{headers: this.headers})
                    .map(res => res.json());
  }


  getAllCategoria(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'categorias/-categoria/9999',{"categoria": ""} ,{headers: this.headers})
                    .map(res => res.json());
  }
  getSindicato(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'basicoSindicatos/-basico_sindicato/9999',{"basico_sindicato": ""} ,{headers: this.headers})
                    .map(res => res.json());
  }


  crear(tipo_unidad,token) {
    const params = {"api_clienteID":  this.api };
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'personal', tipo_unidad, {headers: this.headers})
                    .map(res => res.json());
  }


  desabilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'personalDeshabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }


  habilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'personalHabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }
  
  eliminar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.delete(this.url + 'personal/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  recuperar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'personalRecuperar/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  getId(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'personal/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  editar(tipo_unidad,token,id){
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'personal/'+id, tipo_unidad, {headers: this.headers})
                    .map(res => res.json());
  }

}
