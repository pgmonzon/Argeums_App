import { Injectable } from '@angular/core';
import { global } from '../../global/global';
import { api } from '../../global/Api';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class IngresoSucursalService {

  public url: string;
  public api: string;
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private _http: Http) {
    this.url = global.url;
    this.api = api.API_ClienteID;

  }


  getAll(docID,token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'sbrIngresosSucursales/-fecha/9999/'+docID, {}, { headers: this.headers })
      .map(res => res.json());
  }
  getIngresoSucursal(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.get(this.url + 'sbrIngresoSucursal/' + docID, { headers: this.headers })
      .map(res => res.json());
  }

  crear(ingreso,token){
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'sbrIngresoSucursal', ingreso, { headers: this.headers })
      .map(res => res.json());
  }

  getId(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.get(this.url + 'sbrIngresoSucursal/' + docID, { headers: this.headers })
      .map(res => res.json());
  }


  checkUser(user, token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'usuarioValidar', user, { headers: this.headers })
      .map(res => res.json());
  }

  getCodigoArticulo(codigo,token){
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'sbrArticuloCodBarras/'+codigo, {headers: this.headers})
                    .map(res => res.json());
  }

}
