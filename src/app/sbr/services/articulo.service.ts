import { Injectable } from '@angular/core';
import { global } from '../../global/global';
import { api } from '../../global/Api';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ArticuloService {

  public url: string;
  public api: string;
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private _http: Http) {
    this.url = global.url;
    this.api = api.API_ClienteID;

  }


  getAll(token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'sbrArticulos/articulo/9999', {"articulo": ""}, { headers: this.headers })
      .map(res => res.json());
  }


  desabilitar(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.put(this.url + 'sbrArticuloDeshabilitar/' + docID, {}, { headers: this.headers })
      .map(res => res.json());
  }
  habilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'sbrArticuloHabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }

  crear(sucursal,token){
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'sbrArticulo', sucursal, { headers: this.headers })
      .map(res => res.json());
  }

  getId(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.get(this.url + 'sbrArticulo/' + docID, { headers: this.headers })
      .map(res => res.json());
  }

  eliminar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.delete(this.url + 'sbrArticulo/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  recuperar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'sbrArticuloRecuperar/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }
  editar(sucursal,token,docID){
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'sbrArticulo/'+docID, sucursal, {headers: this.headers})
                    .map(res => res.json());
  }

}
