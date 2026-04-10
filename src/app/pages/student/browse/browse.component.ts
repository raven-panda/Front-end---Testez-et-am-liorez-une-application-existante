import { Component, inject, OnInit } from '@angular/core';
import { Student } from '../../../core/models/student/Student';
import { StudentService } from '../../../core/service/student.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-student-browse',
  imports: [RouterLink],
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

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id)
      .subscribe(() => {
        this.studentService.getAll().subscribe((students) => {
          this.students = students;
        });
      });
  }
}
