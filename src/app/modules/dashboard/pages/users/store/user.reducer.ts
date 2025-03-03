import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../models/user';

export const userFeatureKey = 'user';

export interface State {
  users: User[];
}

export const initialState: State = {
  users: [],
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => {
    return {
      ...state,
      users: [
        {
          "id": 1,
          "email": "admin@mail.com",
          "name": "Administrador",
          "accessToken": "AakjdksaMNfjfpf123",
          "password": "123456",
          "address": "Rancagua norte #123",
          "phone": "987654321",
          "profile": "ADMIN"
        },
        {
          "id": 2,
          "email": "user@mail.com",
          "name": "Usuario General",
          "accessToken": "mdFnjosi0904Sj",
          "password": "123456",
          "address": "Italia #146",
          "phone": "987654321",
          "profile": "USER"
        }
      ]
    }
  }),
  on(UserActions.deleteUserById, (state, action) => {
    return {
      // Nuevo estado donde debemos eliminar el usuario por id
      ...state,
      users: state.users.filter((user) => user.id !== action.id),
    }
  })
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

