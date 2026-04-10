import { inject, Injectable } from '@angular/core';
import { Register } from '../models/Register';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/Login';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);
  private accessToken: string | null = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbWJyb2lzZS5tYWlyZTdAZ21haWwuY29tIiwiaWF0IjoxNzc1ODIyNzQ4LCJleHAiOjE3NzU4MzM1NDh9.Dwdlmknklmd2vnUuoNFIeiS15jq7pe6CBPYq6Gr7aq8_VsoPWkpSMuPaEf7OjtQL1sq4eF5Sm5WQTHbig6lRKw";

  login(user: Login): Observable<LoginResponse> {
    const request = this.httpClient.post<LoginResponse>('/api/login', user);

    request.subscribe(data => {
      this.accessToken = data.token;
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
