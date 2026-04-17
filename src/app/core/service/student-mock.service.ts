import { Observable, of } from 'rxjs';
import { Student } from '../models/student/Student';
import { StudentCreate } from '../models/student/StudentCreate';
import { StudentUpdate } from '../models/student/StudentUpdate';

export class StudentMockService {

  getAll(): Observable<Student[]> {
    return of([]);
  }

  getStudentById(id: number): Observable<Student> {
    return of({
      id: id,
      userId: 1,
      firstName: "John",
      lastName: "Doe",
      createdAt: "",
      updatedAt: "",
    });
  }

  createStudent(student: StudentCreate): Observable<Student> {
    return of({
      id: 1,
      userId: 1,
      firstName: student.user.firstName,
      lastName: student.user.lastName,
      createdAt: "",
      updatedAt: "",
    });
  }

  updateStudent(id: number, student: StudentUpdate): Observable<Student> {
    return of({
      id: id,
      userId: 1,
      firstName: student.user.firstName,
      lastName: student.user.lastName,
      createdAt: "",
      updatedAt: "",
    });
  }

  deleteStudent(id: number): Observable<Object> {
    return of({});
  }
}
