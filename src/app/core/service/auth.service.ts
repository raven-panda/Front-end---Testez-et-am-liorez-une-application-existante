import { inject, Injectable } from '@angular/core';
import { Register } from '../models/Register';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);

  login(user: Login): Observable<Object> {
    return this.httpClient.post('/api/login', user, {
      responseType: 'text'
    });
  }

  register(user: Register): Observable<Object> {
    return this.httpClient.post('/api/register', user);
  }
}
