import { Injectable } from '@angular/core';
import { global } from '../global/global';
import { api } from '../global/Api';
import { basicosindicato } from '../models/basicosindicato';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class SindicatoService {
  public url: string;
  public api: string;

  private headers= new Headers({'Content-Type':'application/x-www-form-urlencoded'});

  constructor(private _http: Http) {
    this.url = global.url;
    this.api = api.API_ClienteID;
   }
   

   getAll(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'basicoSindicatos/-basico_sindicato/9999',{"basico_sindicato": ""} ,{headers: this.headers})
                    .map(res => res.json());
  }


  crear(basico_sindicato,token) {
    const params = {"api_clienteID":  this.api};
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'basicoSindicato', basico_sindicato, {headers: this.headers})
                    .map(res => res.json());
  }



  desabilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'basicoSindicatoDeshabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }


  habilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'basicoSindicatoHabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }
  
  eliminar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.delete(this.url + 'basicoSindicato/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  recuperar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'basicoSindicatoRecuperar/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  getId(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'basicoSindicato/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  editar(tipo_unidad,token,id){
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'basicoSindicato/'+id, tipo_unidad, {headers: this.headers})
                    .map(res => res.json());
  }
}

