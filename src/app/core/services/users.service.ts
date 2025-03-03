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
    // return of([...FAKE_USERS_DB]).pipe(delay(1000));
    return this.httpClient.get<User[]>(`${environment.baseApiUrl}/users`).pipe(delay(1000));
  }

  loadUsers() : void{
    this.store.dispatch(UserActions.loadUsers());
  }

  // addUser(payload: {name: User['name'], email: User['email'], password: User['password'], profile: User['profile']}): Observable<User[]> {
  //   return (
  //     this.httpClient.post<User>(`${environment.baseApiUrl}/users`, payload)
  //     .pipe(concatMap(() => this.getUsers()))
  //   );
  // }
  addUser(): void {
    this.store.dispatch(UserActions.addUser({
      user: {
        email: "neww@mail.com",
        name: "new user",
        accessToken: "AakjdksaMdasdaedf345",
        password: "123456",
        address: "address",
        phone: "987654321",
        profile: "Otro"
      }
    }));
  }

  updateUserById(id: User['id'], data: Partial<User>): void {
    this.store.dispatch(UserActions.updateUserById({id, data}));
  }
  // updateUserById(id: User['id'], data: Partial<User>): Observable<User[]> {
  //   return (
  //     this.httpClient.patch<User>(`${environment.baseApiUrl}/users/${id}`, data).pipe(concatMap(() => this.getUsers()))
  //   )
  // }

  deleteUserById(id: User['id']): void{
    this.store.dispatch(UserActions.deleteUserById({ id }));
  }

  resetUserState(): void {
    this.store.dispatch(UserActions.resetState());
  }
}
