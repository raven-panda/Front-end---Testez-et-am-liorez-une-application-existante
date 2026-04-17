import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { of } from 'rxjs';
import { provideRouter, Router } from '@angular/router';

import { AuthService } from '../../core/service/auth.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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
      imports: [RegisterComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize an invalid form', () => {
    expect(component.registerForm).toBeTruthy();
    expect(component.registerForm.invalid).toBe(true);
    expect(component.form['firstName']?.value).toBe('');
    expect(component.form['lastName']?.value).toBe('');
    expect(component.form['login']?.value).toBe('');
    expect(component.form['password']?.value).toBe('');
  });

  it('should not call register when form is invalid', () => {
    component.onSubmit();

    expect(component.submitted).toBe(true);
    expect(authService.register).not.toHaveBeenCalled();
  });

  it('should call register with form values when form is valid', () => {
    authService.register.mockReturnValue(of({}));
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      login: 'john.doe@example.com',
      password: 'Password123!',
    });

    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      login: 'john.doe@example.com',
      password: 'Password123!',
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to /login after successful register', () => {
    authService.register.mockReturnValue(of({}));
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      login: 'john.doe@example.com',
      password: 'Password123!',
    });

    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
