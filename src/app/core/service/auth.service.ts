import { inject, Injectable } from '@angular/core';
import { Register } from '../models/Register';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/Login';
import { LoginResponse } from '../models/LoginResponse';

export const LOCAL_STORAGE_TOKEN_KEY = "accessToken";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);
  private accessToken: string | null = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  login(user: Login): Observable<LoginResponse> {
    const request = this.httpClient.post<LoginResponse>('/api/login', user);

    request.subscribe(data => {
      this.accessToken = data.token;
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
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
