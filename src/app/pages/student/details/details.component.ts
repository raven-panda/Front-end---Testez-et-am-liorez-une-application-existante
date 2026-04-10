import { Component, inject } from '@angular/core';
import { MaterialModule } from "../../../shared/material.module";
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from "@angular/router";
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
  private studentService = inject(StudentService);

  student: Student | null = null;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentService.getStudentById(+params['id'])
        .subscribe(data => {
          this.student = data;
        });
    });
  }

}
