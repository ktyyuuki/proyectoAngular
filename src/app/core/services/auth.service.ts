import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginPayload } from '../../modules/auth/models';
import { User } from '../../modules/dashboard/pages/users/models/user';
import { Router } from '@angular/router';

export let FAKE_USERS_DB : User[] = [
  {
    id: 1,
    email: "admin@mail.com",
    name: "Administrador",
    accessToken: "AakjdksaMNfjfpf123",
    password: "123456",
    address: "Rancagua norte #123",
    phone: "987654321",
    profile: "ADMIN"
  },
  {
    id: 2,
    email: "user@mail.com",
    name: "Usuario General",
    accessToken: "mdFnjosi0904Sj",
    password: "123456",
    address: "Italia #146",
    phone: "987654321",
    profile: "USER"
  }
]


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);
  authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) { }

  login(payload: LoginPayload): void {
    const loginResult = FAKE_USERS_DB.find(
      (user) =>
        user.email === payload.email && user.password === payload.password
    );

    if(!loginResult){
      alert('Email y/o password inválidos');
      return;
    }
    localStorage.setItem('access_token', loginResult.accessToken);
    this._authUser$.next(loginResult);
    // console.log(loginResult);
    this.router.navigate(['dashboard', 'home']);
  }

  isAuthenticated(): Observable<boolean> {
    const storageUser =  FAKE_USERS_DB.find(x => x.accessToken === localStorage.getItem('access_token'));
    this._authUser$.next(storageUser || null);

    return this.authUser$.pipe(map((x) => !!x))
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this._authUser$.next(null);
    this.router.navigate(['auth', 'login']);
  }
}
