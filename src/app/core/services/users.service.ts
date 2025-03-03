import { Injectable, Pipe } from '@angular/core';
import { User } from '../../modules/dashboard/pages/users/models/user';
import { delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { UserActions } from '../../modules/dashboard/pages/users/store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient, private store: Store) { }

  // getUsers() : Observable<User[]> {
  //   // return of([...FAKE_USERS_DB]).pipe(delay(1000));
  //   return this.httpClient.get<User[]>(`${environment.baseApiUrl}/users`).pipe(delay(1000));
  // }

  loadUsers() : void{
    this.store.dispatch(UserActions.loadUsers());
  }

  deleteUserById(id: User['id']): void{
    this.store.dispatch(UserActions.deleteUserById({ id }));
  }
}
