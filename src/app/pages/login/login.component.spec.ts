import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { of, throwError } from 'rxjs';
import { provideRouter, Router } from '@angular/router';

import { AuthService } from '../../core/service/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jest.Mocked<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceMock = {
      login: jest.fn(),
      register: jest.fn(),
      isAuthenticated: jest.fn(),
      getAccessToken: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize an invalid form', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.invalid).toBe(true);
    expect(component.form['login']?.value).toBe('');
    expect(component.form['password']?.value).toBe('');
  });

  it('should not call login when form is invalid', () => {
    component.onSubmit();

    expect(component.submitted).toBe(true);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should call login with form values when form is valid', () => {
    authService.login.mockReturnValue(of({ token: 'fake-token' }));
    const navigateSpy = jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    component.loginForm.setValue({
      login: 'john.doe@example.com',
      password: 'Password123!',
    });

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({
      login: 'john.doe@example.com',
      password: 'Password123!',
    });
    expect(navigateSpy).toHaveBeenCalledWith('/student');
  });

  it('should navigate to /student after successful login', () => {
    authService.login.mockReturnValue(of({ token: 'fake-token' }));
    const navigateSpy = jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    component.loginForm.setValue({
      login: 'john.doe@example.com',
      password: 'Password123!',
    });

    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledWith('/student');
  });

  it('should set a backend error on login field when login fails', () => {
    authService.login.mockReturnValue(
      throwError(() => ({
        error: {
          message: 'Invalid credentials',
        },
      }))
    );

    component.loginForm.setValue({
      login: 'john.doe@example.com',
      password: 'wrong-password',
    });

    component.onSubmit();

    expect(component.form['login']?.errors).toEqual({
      backend: 'Invalid credentials',
    });
  });
});
