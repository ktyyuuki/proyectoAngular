import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),
    'Load Users Failure': props<{ error: unknown }>(),

    'Add User': props<{user: Omit<User, 'id'>}>(),
    'Add User Success': props<{ data: User }>(),
    'Add User Failure': props<{ error: unknown }>(),

    'Update User By Id': props<{id: User['id'], data: Partial<User>}>(),
    'Update User By Id Success': props<{ data: User }>(),
    'Update User By Id Failure': props<{ error: unknown }>(),

    'Delete User By Id': props<{id: User['id']}>(),
    'Delete User By Id Success': props<{ id:User['id'] }>(),
    'Delete USer By Id Failure': props<{ error: unknown }>(),

    'Reset State': emptyProps(),
  }
});
