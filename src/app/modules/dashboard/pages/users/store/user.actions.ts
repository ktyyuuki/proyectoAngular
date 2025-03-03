import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Add User': props<{user: Omit<User, 'id'>}>(),
    'Update User By Id': props<{id: User['id'], data: Partial<User>}>(),
    'Delete User By Id': props<{id: User['id']}>(),
    'Reset State': emptyProps(),
  }
});
