import { Injectable } from '@angular/core';
import { global } from '../global/global';
import { api } from '../global/Api';
import { Categoria } from '../models/categoria';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class CategoriaService {
  public url: string;
  public api: string;

  private headers= new Headers({'Content-Type':'application/x-www-form-urlencoded'});

  constructor(private _http: Http) {
    this.url = global.url;
    this.api = api.API_ClienteID;
   }
   

   getAll(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'categorias/-categoria/9999',{"categoria": ""} ,{headers: this.headers})
                    .map(res => res.json());
  }


  crear(categoria,token) {
    const params = {"api_clienteID": "yangee_desarrollo" };
    this.headers.set('Authorization',token)
    console.log(categoria);
    return this._http.post(this.url + 'categoria', categoria, {headers: this.headers})
                    .map(res => res.json());
  }



  desabilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'categoriaDeshabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }


  habilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'categoriaHabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }
  
  eliminar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.delete(this.url + 'categoria/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  recuperar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'categoriaRecuperar/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  getId(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'categoria/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  editar(tipo_unidad,token,id){
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'categoria/'+id, tipo_unidad, {headers: this.headers})
                    .map(res => res.json());
  }
}

