import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { UserActions } from './user.actions';
import { UsersService } from '../../../../../core/services/users.service';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.loadUsers),
      concatMap(() =>
        this.usersService.getUsers().pipe(
          //Si el servicio responde ok
          map((users) => UserActions.loadUsersSuccess({ data: users }) ),
          //Si el servicio da error
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.addUser),
      concatMap((action) =>
        this.usersService.addUser(action.user).pipe(
          //Si el servicio responde ok
          map((users) => UserActions.addUserSuccess({ data: users }) ),
          //Si el servicio da error
          catchError((error) => of(UserActions.addUserFailure({ error })))
        )
      )
    );
  });

  updateUserById$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.updateUserById),
      concatMap((action) =>
        this.usersService.updateUserById(action.id, action.data).pipe(
          //Si el servicio responde ok
          map((user) => UserActions.updateUserByIdSuccess({data: user}) ),
          //Si el servicio da error
          catchError((error) => of(UserActions.updateUserByIdFailure({ error })))
        )
      )
    );
  });

  deleteUserById$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.deleteUserById),
      concatMap((action) =>
        this.usersService.deleteUserById(action.id).pipe(
          //Si el servicio responde ok
          map(() => UserActions.deleteUserByIdSuccess({id: action.id}) ),
          //Si el servicio da error
          catchError((error) => of(UserActions.deleteUSerByIdFailure({ error })))
        )
      )
    );
  });

  constructor(private usersService: UsersService) {}
}
