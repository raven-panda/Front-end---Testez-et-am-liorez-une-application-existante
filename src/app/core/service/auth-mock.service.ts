import {Register} from '../models/Register';
import {Observable, of} from 'rxjs';


export class AuthMockService {

  register(user: Register): Observable<Object> {
    return of();
  }
}
