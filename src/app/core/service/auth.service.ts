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
  private accessToken: string | null = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbWJyb2lzZS5tYWlyZTdAZ21haWwuY29tIiwiaWF0IjoxNzc1ODA4MDM2LCJleHAiOjE3NzU4MTg4MzZ9.R8YO09GMIVxbRqJunOtriQoibSn6NqGjzXssEyIRn5Fm8ImsVSfMtq9FCcwpfnjiKLI5NhoXgGFnGK6__XLZUA";

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
