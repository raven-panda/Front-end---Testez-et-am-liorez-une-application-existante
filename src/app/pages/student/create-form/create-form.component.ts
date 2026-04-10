import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentCreate } from '../../../core/models/student/StudentCreate';
import { StudentService } from '../../../core/service/student.service';
import { MaterialModule } from '../../../shared/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-create-form',
  imports: [CommonModule, MaterialModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class StudentCreateFormComponent {
  private studentService = inject(StudentService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private router: Router = inject(Router);

  studentForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  ngOnInit() {
    this.studentForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        login: ['', Validators.required],
        password: ['', Validators.required]
      },
    );
  }

  get form() {
    return this.studentForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.studentForm.invalid) {
      return;
    }

    const payload: StudentCreate = {
      user: {
        firstName: this.studentForm.get("firstName")?.value,
        lastName: this.studentForm.get("lastName")?.value,
        login: this.studentForm.get("login")?.value,
        password: this.studentForm.get("password")?.value,
      }
    }

    this.studentService.createStudent(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.router.navigateByUrl(`/student`);
      });
  }

  onReset(): void {
    this.submitted = false;
    this.studentForm.reset();
  }
}
