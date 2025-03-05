import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { LoginPayload } from '../../modules/auth/models';
import { User } from '../../modules/dashboard/pages/users/models/user';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth/auth.actions';
import { selectAuthUser } from '../../store/auth/auth.selectors';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUser$ : Observable<User | null>;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store
  ) {
    this.authUser$ = this.store.select(selectAuthUser);
  }

  login(payload: LoginPayload): void {
    this.httpClient.get<User[]>(`${environment.baseApiUrl}/users?email=${payload.email}&password=${payload.password}`).subscribe({
      next: (usersResult) => {
        if (!usersResult[0]) {
          alert('Email y/o password inválidos');
          return;
        } else {
          localStorage.setItem('access_token', usersResult[0].accessToken);
          // this._authUser$.next(usersResult[0]); // Actualiza el observable del usuario autenticado
          this.store.dispatch(AuthActions.setAuthUser({user: usersResult[0]}));
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
  }

  isAuthenticated(): Observable<boolean> {
    const accessToken = localStorage.getItem('access_token');
    if(!accessToken){
      this.store.dispatch(AuthActions.unsetAuthUser());
      return of(false);
    }

    return this.httpClient.get<User[]>(`${environment.baseApiUrl}/users?accessToken=${accessToken}`)
      .pipe(
        map((res) => {
          const userResult = res.length > 0 ? res[0] : null;

          if (userResult) {
            this.store.dispatch(AuthActions.setAuthUser({user: userResult}));
            // this._authUser$.next(userResult);
          }
          return !!userResult;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    // this._authUser$.next(null);
    this.store.dispatch(AuthActions.unsetAuthUser());
    this.router.navigate(['auth', 'login']);

  }
}
