import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../core/models/student/Student';
import { StudentUpdate } from '../../../core/models/student/StudentUpdate';
import { StudentService } from '../../../core/service/student.service';
import { MaterialModule } from '../../../shared/material.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-edit-form',
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class StudentEditFormComponent {
  private route = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private studentService = inject(StudentService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  student: Student | null = null;
  studentForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  ngOnInit() {
    this.studentForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      },
    );
    this.route.params.subscribe(params => {
      this.studentService.getStudentById(+params['id'])
        .subscribe(data => {
          this.student = data;
          this.studentForm.setValue({
            firstName: data.firstName,
            lastName: data.lastName,
          });
        });
    });
  }

  get form() {
    return this.studentForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.studentForm.invalid || !this.student) {
      return;
    }

    const payload: StudentUpdate = {
      id: this.student.id,
      user: {
        id: this.student.userId,
        firstName: this.studentForm.get("firstName")?.value,
        lastName: this.studentForm.get("lastName")?.value,
      }
    }

    this.studentService.updateStudent(payload.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.router.navigateByUrl(`/student`);
      });;
  }

  onReset(): void {
    this.submitted = false;
    this.studentForm.reset();
  }
}
