import { Injectable } from '@angular/core';
import { AuthGuard } from './auth-guard.service';

@Injectable()
export class AuthService {

  constructor() { }
  getToken() {
    let token = localStorage.getItem('identity');
    if(!token) return true;
    return false;

  }
}
