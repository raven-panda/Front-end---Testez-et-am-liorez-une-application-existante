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
  private accessToken: string | null = null;

  login(user: Login): Observable<string> {
    const request = this.httpClient.post('/api/login', user, {
      responseType: 'text'
    });

    request.subscribe(data => {
      this.accessToken = data;
    });

    return request;
  }

  register(user: Register): Observable<Object> {
    return this.httpClient.post('/api/register', user);
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
}
