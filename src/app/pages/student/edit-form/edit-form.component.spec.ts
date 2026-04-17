import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';

import { StudentEditFormComponent } from './edit-form.component';
import { StudentService } from '../../../core/service/student.service';
import { Student } from '../../../core/models/student/Student';

describe('StudentEditFormComponent', () => {
  let component: StudentEditFormComponent;
  let fixture: ComponentFixture<StudentEditFormComponent>;
  let studentService: jest.Mocked<StudentService>;
  let router: Router;

  const existingStudent: Student = {
    id: 1,
    userId: 2,
    firstName: 'John',
    lastName: 'Doe',
    createdAt: '',
    updatedAt: '',
  };

  beforeEach(async () => {
    const studentServiceMock = {
      getStudentById: jest.fn().mockReturnValue(of(existingStudent)),
      updateStudent: jest.fn().mockReturnValue(of(existingStudent)),
    } as unknown as jest.Mocked<StudentService>;

    await TestBed.configureTestingModule({
      imports: [StudentEditFormComponent],
      providers: [
        provideRouter([]),
        { provide: StudentService, useValue: studentServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentEditFormComponent);
    component = fixture.componentInstance;
    studentService = TestBed.inject(StudentService) as jest.Mocked<StudentService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the student on init and populate the form', () => {
    expect(studentService.getStudentById).toHaveBeenCalledWith(1);
    expect(component.student).toEqual(existingStudent);
    expect(component.studentForm.value).toEqual({
      firstName: 'John',
      lastName: 'Doe',
    });
    expect(component.loading).toBe(false);
  });

  it('should not call updateStudent when form is invalid', () => {
    component.studentForm.setValue({
      firstName: '',
      lastName: '',
    });

    component.onSubmit();

    expect(studentService.updateStudent).not.toHaveBeenCalled();
  });

  it('should call updateStudent with the form payload when form is valid', () => {
    const navigateSpy = jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    component.studentForm.setValue({
      firstName: 'Jeanne',
      lastName: 'Updated',
    });

    component.onSubmit();

    expect(studentService.updateStudent).toHaveBeenCalledWith(1, {
      id: 1,
      user: {
        id: 2,
        firstName: 'Jeanne',
        lastName: 'Updated',
      }
    });
    expect(navigateSpy).toHaveBeenCalledWith('/student');
  });

  it('should set a backend error when update fails', () => {
    studentService.updateStudent.mockReturnValue(
      throwError(() => ({
        error: {
          message: 'Update failed',
        },
      }))
    );

    component.studentForm.setValue({
      firstName: 'Jeanne',
      lastName: 'Updated',
    });

    component.onSubmit();

    expect(component.form['firstName']?.errors).toEqual({
      backend: 'Update failed',
    });
    expect(component.loading).toBe(false);
  });
});
