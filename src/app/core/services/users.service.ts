import { Injectable } from '@angular/core';
import { User } from '../../modules/dashboard/pages/users/models/user';
import { delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers() : Observable<User[]> {
    // return of([...FAKE_USERS_DB]).pipe(delay(1000));
    return this.httpClient.get<User[]>(`${environment.baseApiUrl}/users`).pipe(delay(1000));
  }
}
