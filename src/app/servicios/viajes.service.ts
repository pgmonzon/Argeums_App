import { Injectable } from '@angular/core';
import { global } from '../global/global';
import { api } from '../global/Api';
import { clientes } from '../models/cliente';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ViajesService {
  public url: string;
  public api: string;

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private _http: Http) {
    this.url = global.url;
    this.api = api.API_ClienteID;
  }


  getAll(token,desde,hasta) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'viajes', {"fechaDesde": desde,"fechaHasta":hasta}, { headers: this.headers })
      .map(res => res.json());
  }
  //CLIENTE 
  getClienteAll(token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'clientes/-cliente/9999', { "cliente": "" }, { headers: this.headers })
      .map(res => res.json());
  }
  //TIPO UNIDAD_ID
  getTipoUnidadAll(token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'tipoUnidades/-tipo_unidad/9999', { "tipo_unidad": "" }, { headers: this.headers })
      .map(res => res.json());
  }
  //TRASNPORTISTA_ID
  getTransportistaAll(token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'transportistas/-transportista/9999', { "cliente": "" }, { headers: this.headers })
      .map(res => res.json());
  }
  //UNIDADAD_ID
  getUnidadAll(token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'unidades/-unidad/9999', { "tipo_unidad": "" }, { headers: this.headers })
      .map(res => res.json());
  }

  //PERSONAL_ID
  getPersonalAll(token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'personales/-nombre/9999', { "apellido": "", "nombre": "" }, { headers: this.headers })
      .map(res => res.json());
  }
  //LOCAIONES_ID
  getLocacionesAll(token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'locaciones/-locacion/9999', { "locacion": "", "direccion": "" }, { headers: this.headers })
      .map(res => res.json());
  }
  getLocacionAll(token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'locaciones/-locacion/9999', { "locacion": "", "direccion": "" }, { headers: this.headers })
      .map(res => res.json());
  }
  getTipoUnidad(token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'tipoUnidades/-tipo_unidad/9999', { "tipo_unidad": "" }, { headers: this.headers })
      .map(res => res.json());
  }

  crear(viajess, token) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'viaje', viajess, { headers: this.headers })
      .map(res => res.json());
  }



  desabilitar(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.put(this.url + 'transportistaDeshabilitar/' + docID, {}, { headers: this.headers })
      .map(res => res.json());
  }


  habilitar(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.put(this.url + 'transportistaHabilitar/' + docID, {}, { headers: this.headers })
      .map(res => res.json());
  }

  eliminar(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.delete(this.url + 'transportista/' + docID, { headers: this.headers })
      .map(res => res.json());
  }

  recuperar(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.get(this.url + 'transportistaRecuperar/' + docID, { headers: this.headers })
      .map(res => res.json());
  }

  getId(docID, token) {
    this.headers.set('Authorization', token)
    return this._http.get(this.url + 'viaje/' + docID, { headers: this.headers })
      .map(res => res.json());
  }

  editar(tipo_unidad, token, id) {
    this.headers.set('Authorization', token)
    return this._http.put(this.url + 'viaje/' + id, tipo_unidad, { headers: this.headers })
      .map(res => res.json());
  }

  map(primera, segunda) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    return this._http.post(proxyurl+"https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + primera + "&destinations=" + segunda + "&key=AIzaSyBBzPRcvDDltKZcNKS_6TGL3qF36gbdc3M&libraries", { headers: this.headers })
      .map(res => res.json());

  }


  //AUTHORIZAR VIAJE
  viajeAutValor(ValorViaje, token, id) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'viajeAutValor/' + id, ValorViaje, { headers: this.headers })
      .map(res => res.json());
  }
  //AUTORIZAR COSTO
  viajeAutCosto(ValorCosto, token, id) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'viajeAutCosto/' + id, ValorCosto, { headers: this.headers })
      .map(res => res.json());
  }
  //AUTORIZAR REMITO
  remito(token, id) {
    this.headers.set('Authorization', token)
    return this._http.put(this.url + 'viajeRemitos/' + id, {}, { headers: this.headers })
      .map(res => res.json());
  }

   //AUTORIZAR REMITO
   estadoAuth(token, id,observacion) {
    this.headers.set('Authorization', token)
    return this._http.post(this.url + 'viajeCancelar/' + id, observacion, { headers: this.headers })
      .map(res => res.json());
  }
}
