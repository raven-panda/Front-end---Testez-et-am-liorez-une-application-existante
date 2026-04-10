import { inject } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { Router } from "@angular/router";

export const unauthorizedErrorInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigateByUrl('/login');
      }
      return throwError(() => error);
    })
  );
}