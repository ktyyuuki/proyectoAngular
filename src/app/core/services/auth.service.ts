import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { LoginPayload } from '../../modules/auth/models';
import { User } from '../../modules/dashboard/pages/users/models/user';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);
  authUser$ = this._authUser$.asObservable();

  constructor(private router: Router, private httpClient: HttpClient) { }

  login(payload: LoginPayload): void {
    this.httpClient.get<User[]>(`${environment.baseApiUrl}/users?email=${payload.email}&password=${payload.password}`).subscribe({
      next: (usersResult) => {
        // console.log("Usuarios obtenidos:", users);
        if (!usersResult[0]) {
          alert('Email y/o password inválidos');
          return;
        } else {
          localStorage.setItem('access_token', usersResult[0].accessToken);
          this._authUser$.next(usersResult[0]); // Actualiza el observable del usuario autenticado
        }
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            alert('El servidor esta caido');
          }
        }
      },
      complete : () => {
        this.router.navigate(['dashboard', 'home']);
      }
    })
    // const loginResult = FAKE_USERS_DB.find(
    //   (user) =>
    //     user.email === payload.email && user.password === payload.password
    // );

    // if(!loginResult){
    //   alert('Email y/o password inválidos');
    //   return;
    // }
    // localStorage.setItem('access_token', loginResult.accessToken);
    // this._authUser$.next(loginResult);
    // // console.log(loginResult);
    // this.router.navigate(['dashboard', 'home']);
  }

  isAuthenticated(): Observable<boolean> {
    // const storageUser =  FAKE_USERS_DB.find(x => x.accessToken === localStorage.getItem('access_token'));
    // this._authUser$.next(storageUser || null);

    // return this.authUser$.pipe(map((x) => !!x))
    const accessToken = localStorage.getItem('access_token');
    if(!accessToken){
      this._authUser$.next(null);
      return of(false);
    }

    return this.httpClient.get<User[]>(`${environment.baseApiUrl}/users?accessToken=${accessToken}`)
      .pipe(
        map((res) => {
          const userResult = res.length > 0 ? res[0] : null;

          if (userResult) {
            console.log(userResult);
            this._authUser$.next(userResult);
          }
          return !!userResult;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this._authUser$.next(null);
    this.router.navigate(['auth', 'login']);
  }
}
