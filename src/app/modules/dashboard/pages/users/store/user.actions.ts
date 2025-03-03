import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Delete User By Id': props<{id: User['id']}>(),

  }
});
