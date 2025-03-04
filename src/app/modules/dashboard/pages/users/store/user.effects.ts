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

  constructor(private usersService: UsersService) {}
}
