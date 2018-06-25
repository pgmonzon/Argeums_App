import { Injectable } from '@angular/core';
import { global } from '../global/global';
import { api } from '../global/Api';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RendicionesService {
  public url: string;
  public api: string;
  private headers= new Headers({'Content-Type':'application/x-www-form-urlencoded'});

  constructor(private _http: Http) { 
    this.url = global.url;
    this.api = api.API_ClienteID;

  }
  getAll(token,id){
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'rendicionPersonal/'+id ,{headers: this.headers})
                    .map(res => res.json());
  }
 

  crear(rendicion,token) {
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'rendicion', rendicion, {headers: this.headers})
                    .map(res => res.json());
  }
//getAllPersonal
  getAllPersonal(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'personales/-nombre/9999',{"apellido": "","nombre": ""} ,{headers: this.headers})
                    .map(res => res.json());
  }

  getAllCuentasGastos(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'cuentaGastos/-cuenta_gasto/9999',{"tipo_unidad": ""} ,{headers: this.headers})
                    .map(res => res.json());
  }
}
