import { Injectable } from '@angular/core';
import { global } from '../../global/global';
import { api } from '../../global/Api';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class RubroService {

  public url: string;
  public api: string;
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private _http: Http) {
    this.url = global.url;
    this.api = api.API_ClienteID;

  }


  getAll(token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'sbrRubros/-rubro/9999', {"rubro": ""}, { headers: this.headers })
      .map(res => res.json());
  }


  desabilitar(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.put(this.url + 'sbrRubroDeshabilitar/' + docID, {}, { headers: this.headers })
      .map(res => res.json());
  }
  habilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'sbrRubroHabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }


  crear(rubro,token){
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'sbrRubro', rubro, { headers: this.headers })
      .map(res => res.json());
  }

  getId(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.get(this.url + '/sbrRubro/' + docID, { headers: this.headers })
      .map(res => res.json());
  }

  eliminar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.delete(this.url + 'sbrRubro/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  recuperar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'sbrRubroRecuperar/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }
  editar(sucursal,token,docID){
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'sbrRubro/'+docID, sucursal, {headers: this.headers})
                    .map(res => res.json());
  }

}
