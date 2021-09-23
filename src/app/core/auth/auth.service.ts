import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { user } from '../../shared/model/user';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  signinUser(userModel: user) {
    return this.httpClient.post(`${environment.endPoint}api/login`, userModel);
  }
}
