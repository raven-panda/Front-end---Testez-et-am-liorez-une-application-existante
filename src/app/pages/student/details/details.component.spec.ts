import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { of } from 'rxjs';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';

import { StudentDetailsComponent } from './details.component';
import { StudentService } from '../../../core/service/student.service';
import { Student } from '../../../core/models/student/Student';

describe('StudentDetailsComponent', () => {
  let component: StudentDetailsComponent;
  let fixture: ComponentFixture<StudentDetailsComponent>;
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
      deleteStudent: jest.fn().mockReturnValue(of({})),
    } as unknown as jest.Mocked<StudentService>;

    await TestBed.configureTestingModule({
      imports: [StudentDetailsComponent],
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

    fixture = TestBed.createComponent(StudentDetailsComponent);
    component = fixture.componentInstance;
    studentService = TestBed.inject(StudentService) as jest.Mocked<StudentService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the student on init', () => {
    expect(studentService.getStudentById).toHaveBeenCalledWith(1);
    expect(component.student).toEqual(existingStudent);
    expect(component.loading).toBe(false);
  });

  it('should not delete when student is null', () => {
    component.student = null;

    component.deleteStudent();

    expect(studentService.deleteStudent).not.toHaveBeenCalled();
  });

  it('should delete the student and navigate back to browse', () => {
    const navigateSpy = jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    component.deleteStudent();

    expect(studentService.deleteStudent).toHaveBeenCalledWith(1);
    expect(navigateSpy).toHaveBeenCalledWith('/student');
    expect(component.loading).toBe(false);
  });
});
