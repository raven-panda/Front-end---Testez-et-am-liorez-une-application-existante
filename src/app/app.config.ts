import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { authInterceptor } from './core/authentication/auth.interceptor';
import { unauthorizedErrorInterceptor } from './core/authentication/unauthorized.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor, unauthorizedErrorInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)
  ]
};
