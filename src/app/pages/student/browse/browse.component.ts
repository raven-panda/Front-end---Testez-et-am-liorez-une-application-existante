import { Component, inject, OnInit } from '@angular/core';
import { Student } from '../../../core/models/student/Student';
import { StudentService } from '../../../core/service/student.service';

@Component({
  selector: 'app-student-browse',
  imports: [],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class StudentBrowseComponent implements OnInit {
  private studentService: StudentService = inject(StudentService);

  students: Student[] = [];

  ngOnInit(): void {
    this.studentService.getAll().subscribe((students) => {
      this.students = students;
    });
  }
}
