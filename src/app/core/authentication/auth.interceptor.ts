import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../service/auth.service";

export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const authService = inject(AuthService);

  const reqWithAccessToken = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authService.getAccessToken()}`),
  });

  return next(reqWithAccessToken);
}