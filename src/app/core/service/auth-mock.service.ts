import {Register} from '../models/Register';
import {Observable, of} from 'rxjs';
import { Login } from '../models/Login';
import { LoginResponse } from '../models/LoginResponse';

export class AuthMockService {

  register(user: Register): Observable<Object> {
    return of({});
  }

  login(user: Login): Observable<LoginResponse> {
    return of({ token: 'fake-token' });
  }
}
