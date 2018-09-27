import { Injectable } from '@angular/core';
import { global } from '../../global/global';
import { api } from '../../global/Api';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SucursalService {

  public url: string;
  public api: string;
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private _http: Http) {
    this.url = global.url;
    this.api = api.API_ClienteID;

  }


  getAll(token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'sbrSucursales/-sucursal/9999', {"sucursal": ""}, { headers: this.headers })
      .map(res => res.json());
  }


  desabilitar(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.put(this.url + 'sbrSucursalDeshabilitar/' + docID, {}, { headers: this.headers })
      .map(res => res.json());
  }
  habilitar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'sbrSucursalHabilitar/'+docID,{}, {headers: this.headers})
                    .map(res => res.json());
  }

  AutorizacionAutorizar(docID, token, importe) {
    this.headers.set('Authorization', token)
    return this._http.put(this.url + 'autorizacionAutorizar/' + docID, {"importe": importe}, { headers: this.headers })
      .map(res => res.json());
  }

  crear(sucursal,token){
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'sbrSucursal', sucursal, { headers: this.headers })
      .map(res => res.json());
  }

  getId(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.get(this.url + '/sbrSucursal/' + docID, { headers: this.headers })
      .map(res => res.json());
  }

  eliminar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.delete(this.url + 'sbrSucursal/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }

  recuperar(docID,token) {
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'sbrSucursalRecuperar/'+docID, {headers: this.headers})
                    .map(res => res.json());
  }
  editar(sucursal,token,docID){
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'sbrSucursal/'+docID, sucursal, {headers: this.headers})
                    .map(res => res.json());
  }
}
