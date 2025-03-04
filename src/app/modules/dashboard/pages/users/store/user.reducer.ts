import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../models/user';

export const userFeatureKey = 'user';

export interface State {
  users: User[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  users: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(UserActions.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.data,
      isLoading: false,
      error: null,
    }
  }),
  on(UserActions.loadUsersFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    }
  }),

  on(UserActions.addUser, (state) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(UserActions.addUserSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      users: [...state.users, action.data]
    }
  }),
  on(UserActions.addUserFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    }
  }),

  on(UserActions.deleteUserById, (state) => {
    return {
      // Nuevo estado donde debemos eliminar el usuario por id
      ...state,
      isLoading: true,
    }
  }),
  on(UserActions.deleteUserByIdSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      users: state.users.filter((user) => user.id !== action.id),
      error: null,
    }
  }),
  on(UserActions.deleteUSerByIdFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    }
  }),

  on(UserActions.updateUserById, (state) => {
    return{
      ...state,
      isLoading: true
    }
  }),
  on(UserActions.updateUserByIdSuccess, (state, action) => {
    return{
      ...state,
      isLoading: false,
      users: state.users.map((user) => user.id === action.data.id ? {...user, ...action.data} : user),
      error: null,
    }
  }),
  on(UserActions.updateUserByIdFailure, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: action.error,
    }
  }),

  on(UserActions.resetState, () => initialState)
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

