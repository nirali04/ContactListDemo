import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  GetUsers(page: number) {
    return this.http.get(`${environment.endPoint}api/users?page=${page}`);
  }

  CreateUsers(user) {
    return this.http.post(`${environment.endPoint}api/users`,user);
  }
}
