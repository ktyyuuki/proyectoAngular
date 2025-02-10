import { Injectable } from '@angular/core';
import { User } from '../../modules/dashboard/pages/users/models/user';
import { delay, Observable, of } from 'rxjs';

let USERS_DB : User[] = [
  {
    id: 1,
    email: "admin@mail.com",
    name: "Matias",
    password: "123456",
    address: "Rancagua norte #123",
    phone: "987654321",
    profile: "ADMIN"
  },
  {
    id: 2,
    email: "user@mail.com",
    name: "Leonardo",
    password: "123456",
    address: "Italia #146",
    phone: "987654321",
    profile: "USER"
  }
]

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getUsers() : Observable<User[]> {
    return of([...USERS_DB]).pipe(delay(1000));
  }
}
