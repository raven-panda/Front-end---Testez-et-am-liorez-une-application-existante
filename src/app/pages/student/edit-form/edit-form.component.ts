import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../core/models/student/Student';
import { StudentUpdate } from '../../../core/models/student/StudentUpdate';
import { StudentService } from '../../../core/service/student.service';
import { MaterialModule } from '../../../shared/material.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-student-edit-form',
  standalone: true,
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

  loading: boolean = true;
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
          this.loading = false;
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
    
    this.loading = true;
    this.studentService.updateStudent(payload.id, payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((errData) => {
          if (errData.error?.message) {
            this.form['firstName']?.setErrors({
              backend: errData.error.message
            });
          }
          this.loading = false;
          return new Observable<HttpEvent<any>>();
        })
      )
      .subscribe(data => {
        this.router.navigateByUrl(`/student`);
        this.loading = false;
      });
  }

  onReset(): void {
    this.submitted = false;
    this.loading = false;
    this.studentForm.reset();
  }
}
