import { Component, inject } from '@angular/core';
import { MaterialModule } from "../../../shared/material.module";
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Student } from '../../../core/models/student/Student';
import { StudentService } from '../../../core/service/student.service';

@Component({
  selector: 'app-student-details',
  imports: [MaterialModule, MatIconModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class StudentDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private studentService = inject(StudentService);

  loading: boolean = true;
  student: Student | null = null;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentService.getStudentById(+params['id'])
        .subscribe(data => {
          this.student = data;
          this.loading = false;
        });
    });
  }

  deleteStudent(): void {
    if (!this.student)
      return;

    this.loading = true;
    this.studentService.deleteStudent(this.student.id)
      .subscribe(() => {
        this.router.navigateByUrl("/student");
        this.loading = false;
      });
  }

}
