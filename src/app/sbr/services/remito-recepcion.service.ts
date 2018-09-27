import { Injectable } from '@angular/core';
import { global } from '../../global/global';
import { api } from '../../global/Api';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RemitoRecepcionService {
  public url: string;
  public api: string;
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private _http: Http) {
    this.url = global.url;
    this.api = api.API_ClienteID;

  }



 
}
