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
          id: "1",
          email: "admin@mail.com",
          name: "admin prueba",
          accessToken: "AakjdksaMNfjfpf123",
          password: "123456",
          address: "Rancagua norte #123",
          phone: "987654321",
          profile: "ADMIN"
        },
        {
          id: "2",
          email: "user@mail.com",
          name: "User1",
          accessToken: "mdFnjosi0904Sj",
          password: "123456",
          address: "Italia #146",
          phone: "987654321",
          profile: "USER"
        }
      ]
    }
  }),
  on(UserActions.addUser, (state, action) => {
    return {
      ...state,
      users: [...state.users, { id: 'new', ...action.user }]
    }
  }),
  on(UserActions.deleteUserById, (state, action) => {
    return {
      // Nuevo estado donde debemos eliminar el usuario por id
      ...state,
      users: state.users.filter((user) => user.id !== action.id),
    }
  }),
  on(UserActions.updateUserById, (state, action) => {
    return{
      ...state,
      users: state.users.map((user) => user.id === action.id ? {...user, ...action.data} : user),
    }
  }),
  on(UserActions.resetState, () => initialState)
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

