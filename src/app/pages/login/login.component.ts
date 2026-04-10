import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../core/models/Login';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, MaterialModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private userService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private router: Router = inject(Router);

  loginForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        login: ['', Validators.required],
        password: ['', Validators.required]
      },
    );
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const loginUser: Login = {
      login: this.loginForm.get('login')?.value,
      password: this.loginForm.get('password')?.value
    };
    this.userService.login(loginUser)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((errData) => {
          const error = errData?.error && JSON.parse(errData.error);
          if (error?.message) {
            this.form['login']?.setErrors({
              backend: error.message
            });            
          }
          return new Observable<HttpEvent<any>>();
        })
      )
      .subscribe(() => {;
        console.log('navigate');
        this.router.navigateByUrl("/student");
      },
    );
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
}

