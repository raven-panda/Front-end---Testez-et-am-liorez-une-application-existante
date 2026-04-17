import {EnvironmentProviders, Provider, provideZoneChangeDetection} from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

const testProviders: (Provider|EnvironmentProviders)[] = [
  provideHttpClient(),
  provideHttpClientTesting(), 
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
];

export default testProviders;