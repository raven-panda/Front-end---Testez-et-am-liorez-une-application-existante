import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { of } from 'rxjs';

import { StudentService } from '../../../core/service/student.service';
import { StudentBrowseComponent } from './browse.component';
import { Student } from '../../../core/models/student/Student';
import { ActivatedRoute } from '@angular/router';

describe('StudentBrowseComponent', () => {
  let component: StudentBrowseComponent;
  let fixture: ComponentFixture<StudentBrowseComponent>;
  let studentService: jest.Mocked<StudentService>;

  const students: Student[] = [
    {
      id: 1,
      userId: 2,
      firstName: 'John',
      lastName: 'Doe',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 2,
      userId: 3,
      firstName: 'Jane',
      lastName: 'Smith',
      createdAt: '',
      updatedAt: '',
    },
  ];

  beforeEach(async () => {
    const studentServiceMock = {
      getAll: jest.fn().mockReturnValue(of(students)),
      deleteStudent: jest.fn().mockReturnValue(of({})),
    } as unknown as jest.Mocked<StudentService>;

    await TestBed.configureTestingModule({
      imports: [StudentBrowseComponent],
      providers: [
        { provide: StudentService, useValue: studentServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentBrowseComponent);
    component = fixture.componentInstance;
    studentService = TestBed.inject(StudentService) as jest.Mocked<StudentService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load students on init', () => {
    expect(studentService.getAll).toHaveBeenCalled();
    expect(component.students).toEqual(students);
    expect(component.loading).toBe(false);
  });

  it('should delete a student and reload the list', () => {
    component.deleteStudent(1);

    expect(studentService.deleteStudent).toHaveBeenCalledWith(1);
    expect(studentService.getAll).toHaveBeenCalledTimes(2);
    expect(component.students).toEqual(students);
    expect(component.loading).toBe(false);
  });
});
