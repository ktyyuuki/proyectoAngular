import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../modules/dashboard/pages/users/models/user";

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'set auth user': props<{ user: User }>(),
    'unset auth user': emptyProps(), // no recibe datos
  },
});
