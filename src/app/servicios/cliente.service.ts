import { Injectable } from '@angular/core';
import { global } from '../global/global';
import { api } from '../global/Api';
import { clientes } from '../models/cliente';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ClienteService {

  public url: string;
  public api: string;

  private headers= new Headers({'Content-Type':'application/x-www-form-urlencoded'});

  constructor(private _http: Http) {
    this.url = global.url;
    this.api = api.API_ClienteID;
   }
   

   getAll(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'clientes/-cliente/9999',{"cliente": ""} ,{headers: this.headers})
                    .map(res => res.json());
  }

  getTipoUnidad(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'tipoUnidades/-tipo_unidad/9999',{"tipo_unidad": ""} ,{headers: this.headers})
                    .map(res => res.json());
  }
  getLocacionAll(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'locaciones/-locacion/9999',{"locacion": "","direccion": ""} ,{headers: this.headers})
                    .map(res => res.json());
  }
  crear(cliente,token) {
    const params = {"api_clienteID": "yangee_desarrollo" };
    this.headers.set('Authorization',token)
    console.log(cliente);
    return this._http.post(this.url + 'cliente', cliente, {headers: this.headers})
                    .map(res => res.json());
  }



  desabilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'clienteDeshabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }


  habilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'clienteHabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }
  
  eliminar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.delete(this.url + 'cliente/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  recuperar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'clienteRecuperar/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  getId(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'cliente/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  editar(tipo_unidad,token,id){
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'cliente/'+id, tipo_unidad, {headers: this.headers})
                    .map(res => res.json());
  }

}
