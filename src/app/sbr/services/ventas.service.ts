import { Injectable } from '@angular/core';
import { global } from '../../global/global';
import { api } from '../../global/Api';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class VentasService {

  public url: string;
  public api: string;
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private _http: Http) {
    this.url = global.url;
    this.api = api.API_ClienteID;

  }

  getAll(docID,token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'sbrVentasTraer/-fecha/1000/'+docID, {}, { headers: this.headers })
      .map(res => res.json());
  }


  sbrVentas(sucursal,token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'sbrVentas', sucursal, { headers: this.headers })
      .map(res => res.json());
  }
  sbrVentasDetalleTraer(id,token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'sbrVentasDetalleTraer/'+id, {}, { headers: this.headers })
      .map(res => res.json());
  }

  getCodigoArticulo(codigo,token){
    this.headers.set('Authorization',token)
    return this._http.get(this.url + 'sbrArticuloCodBarras/'+codigo, {headers: this.headers})
                    .map(res => res.json());
  }

  sbrVentasDetalle(detalle,token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'sbrVentasDetalle', detalle, { headers: this.headers })
      .map(res => res.json());
  }


  sbrVentasGastos(gasto,token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'sbrVentasGastos', gasto, { headers: this.headers })
      .map(res => res.json());
  }
  sbrVentasGastosTraer(id,token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'sbrVentasGastosTraer/'+id, {}, { headers: this.headers })
      .map(res => res.json());
  }

  deleteDetalle(id,detalle,token){
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'sbrVentasDetalle/'+id,detalle, {headers: this.headers})
                    .map(res => res.json());
  }

  deleteGastos(id,detalle,token){
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'sbrVentasGastos/'+id,detalle, {headers: this.headers})
                    .map(res => res.json());
  }
  usuariosEmpresa(token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'usuariosEmpresa',{}, { headers: this.headers })
      .map(res => res.json());
  }

  

  getCuentasGastos(token){
    this.headers.set('Authorization',token)
    return this._http.post(this.url + 'cuentaGastos/-cuenta_gasto/9999',{"tipo_unidad": ""} ,{headers: this.headers})
                    .map(res => res.json());
  }

  checkUser(user, token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'usuarioValidar', user, { headers: this.headers })
      .map(res => res.json());
  }

  sbrVentasCerrarCaja(id,detalle,token){
    this.headers.set('Authorization',token)
    return this._http.put(this.url + 'sbrVentasCerrarCaja/'+id,detalle, {headers: this.headers})
                    .map(res => res.json());
  }
}


