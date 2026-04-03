import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student/Student';
import { StudentCreate } from '../models/student/StudentCreate';
import { StudentUpdate } from '../models/student/StudentUpdate';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private httpClient: HttpClient = inject(HttpClient);

  getAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>('/api/student', {
      withCredentials: true
    });
  }

  getStudentById(id: number): Observable<Student> {
    return this.httpClient.get<Student>(`/api/student/${id}`, {
      withCredentials: true
    });
  }

  createStudent(student: StudentCreate): Observable<Student> {
    return this.httpClient.post<Student>(`/api/student`, student, {
      withCredentials: true
    });
  }

  updateStudent(id: number, student: StudentUpdate): Observable<Student> {
    return this.httpClient.put<Student>(`/api/student/${id}`, student, {
      withCredentials: true
    });
  }

  deleteStudent(id: number): Observable<Object> {
    return this.httpClient.delete(`/api/student/${id}`, {
      withCredentials: true
    });
  }
}
