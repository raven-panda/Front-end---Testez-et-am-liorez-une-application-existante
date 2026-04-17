import { describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { AuthService, LOCAL_STORAGE_TOKEN_KEY } from './auth.service';
import { Login } from '../models/Login';
import { LoginResponse } from '../models/LoginResponse';
import { Register } from '../models/Register';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('register should send a POST request to /api/register', () => {
    const payload: Register = {
      firstName: 'John',
      lastName: 'Doe',
      login: 'john.doe@example.com',
      password: 'Password123!',
    };

    service.register(payload).subscribe((response) => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne('/api/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush({});
  });

  it('login should send a POST request to /api/login', () => {
    const payload: Login = {
      login: 'john.doe@example.com',
      password: 'Password123!',
    };

    const response: LoginResponse = {
      token: 'fake-jwt-token',
    };

    service.login(payload).subscribe((loginResponse) => {
      expect(loginResponse).toEqual(response);
    });

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush(response);
  });

  it('login should store the access token', () => {
    const payload: Login = {
      login: 'john.doe@example.com',
      password: 'Password123!',
    };

    const response: LoginResponse = {
      token: 'fake-jwt-token',
    };

    service.login(payload).subscribe();

    const req = httpMock.expectOne('/api/login');
    req.flush(response);

    expect(service.getAccessToken()).toBe('fake-jwt-token');
    expect(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)).toBe('fake-jwt-token');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('isAuthenticated should return false when there is no token', () => {
    expect(service.isAuthenticated()).toBe(false);
    expect(service.getAccessToken()).toBeNull();
  });
});
