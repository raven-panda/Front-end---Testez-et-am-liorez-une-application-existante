import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { of, throwError } from 'rxjs';
import { provideRouter, Router } from '@angular/router';

import { StudentCreateFormComponent } from './create-form.component';
import { StudentService } from '../../../core/service/student.service';

describe('StudentCreateFormComponent', () => {
  let component: StudentCreateFormComponent;
  let fixture: ComponentFixture<StudentCreateFormComponent>;
  let studentService: jest.Mocked<StudentService>;
  let router: Router;

  beforeEach(async () => {
    const studentServiceMock = {
      createStudent: jest.fn(),
    } as unknown as jest.Mocked<StudentService>;

    await TestBed.configureTestingModule({
      imports: [StudentCreateFormComponent],
      providers: [
        provideRouter([]),
        { provide: StudentService, useValue: studentServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCreateFormComponent);
    component = fixture.componentInstance;
    studentService = TestBed.inject(StudentService) as jest.Mocked<StudentService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize an invalid form', () => {
    expect(component.studentForm.invalid).toBe(true);
  });

  it('should not call createStudent when form is invalid', () => {
    component.onSubmit();

    expect(component.submitted).toBe(true);
    expect(studentService.createStudent).not.toHaveBeenCalled();
  });

  it('should call createStudent with the form payload when form is valid', () => {
    studentService.createStudent.mockReturnValue(of({} as any));
    const navigateSpy = jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    component.studentForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      login: 'john@example.com',
      password: 'Password123!',
    });

    component.onSubmit();

    expect(studentService.createStudent).toHaveBeenCalledWith({
      user: {
        firstName: 'John',
        lastName: 'Doe',
        login: 'john@example.com',
        password: 'Password123!',
      }
    });
    expect(navigateSpy).toHaveBeenCalledWith('/student');
  });

  it('should set a backend error when create fails', () => {
    studentService.createStudent.mockReturnValue(
      throwError(() => ({
        error: {
          message: 'Login already exists',
        },
      }))
    );

    component.studentForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      login: 'john@example.com',
      password: 'Password123!',
    });

    component.onSubmit();

    expect(component.form['firstName']?.errors).toEqual({
      backend: 'Login already exists',
    });
    expect(component.loading).toBe(false);
  });
});
