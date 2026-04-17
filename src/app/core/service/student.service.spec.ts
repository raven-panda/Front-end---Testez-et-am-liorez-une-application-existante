import { describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { StudentService } from './student.service';
import { Student } from '../models/student/Student';
import { StudentCreate } from '../models/student/StudentCreate';
import { StudentUpdate } from '../models/student/StudentUpdate';

describe('StudentService', () => {
  let service: StudentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        StudentService,
      ],
    });

    service = TestBed.inject(StudentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll should send a GET request to /api/student', () => {
    const expectedStudents: Student[] = [
      {
        id: 1,
        userId: 1,
        firstName: 'John',
        lastName: 'Doe',
        createdAt: '',
        updatedAt: '',
      },
    ];

    service.getAll().subscribe((students) => {
      expect(students).toEqual(expectedStudents);
    });

    const req = httpMock.expectOne('/api/student');
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBe(true);

    req.flush(expectedStudents);
  });

  it('getStudentById should send a GET request to /api/student/{id}', () => {
    const expectedStudent: Student = {
      id: 1,
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      createdAt: '',
      updatedAt: '',
    };

    service.getStudentById(1).subscribe((student) => {
      expect(student).toEqual(expectedStudent);
    });

    const req = httpMock.expectOne('/api/student/1');
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBe(true);

    req.flush(expectedStudent);
  });

  it('createStudent should send a POST request to /api/student', () => {
    const payload: StudentCreate = {
      user: {
        firstName: 'John',
        lastName: 'Doe',
        login: 'john.doe@example.com',
        password: 'Password123!',
      },
    };

    const createdStudent: Student = {
      id: 1,
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      createdAt: '',
      updatedAt: '',
    };

    service.createStudent(payload).subscribe((student) => {
      expect(student).toEqual(createdStudent);
    });

    const req = httpMock.expectOne('/api/student');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    expect(req.request.withCredentials).toBe(true);

    req.flush(createdStudent);
  });

  it('updateStudent should send a PUT request to /api/student/{id}', () => {
    const payload: StudentUpdate = {
      id: 1,
      user: {
        id: 1,
        firstName: 'Jeanne',
        lastName: 'Updated',
      },
    };

    const updatedStudent: Student = {
      id: 1,
      userId: 1,
      firstName: 'Jeanne',
      lastName: 'Updated',
      createdAt: '',
      updatedAt: '',
    };

    service.updateStudent(1, payload).subscribe((student) => {
      expect(student).toEqual(updatedStudent);
    });

    const req = httpMock.expectOne('/api/student/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);
    expect(req.request.withCredentials).toBe(true);

    req.flush(updatedStudent);
  });

  it('deleteStudent should send a DELETE request to /api/student/{id}', () => {
    service.deleteStudent(1).subscribe((response) => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne('/api/student/1');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.withCredentials).toBe(true);

    req.flush({});
  });
});
