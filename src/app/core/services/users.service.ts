import { Injectable, Pipe } from '@angular/core';
import { User } from '../../modules/dashboard/pages/users/models/user';
import { concat, concatMap, delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { UserActions } from '../../modules/dashboard/pages/users/store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient, private store: Store) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.baseApiUrl}/users`).pipe(delay(1000));
  }

  addUser(payload: Omit<User, 'id'>): Observable<User> {
    return this.httpClient.post<User>(`${environment.baseApiUrl}/users`, payload).pipe(delay(500));
  }

  // updateUserById(id: User['id'], data: Partial<User>): void {
  //   this.store.dispatch(UserActions.updateUserById({id, data}));
  // }
  updateUserById(id: User['id'], data: Partial<User>): Observable<User> {
    return this.httpClient.patch<User>(`${environment.baseApiUrl}/users/${id}`, data).pipe(delay(500));
  }

  deleteUserById(id: User['id']): Observable<User[]>{
    return (
      this.httpClient.delete<User>(`${environment.baseApiUrl}/users/${id}`)
      .pipe(concatMap(() => this.getUsers()))
    )
  }

}
