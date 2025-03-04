import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { Inscription } from '../models';

export const inscriptionFeatureKey = 'inscription';

export interface State {
  inscriptions: Inscription[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  inscriptions: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InscriptionActions.loadInscriptions, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      inscriptions: action.data,
      isLoading: false,
      error: null,
    }
  }),
  on(InscriptionActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    }
  }),

  on(InscriptionActions.createInscription, (state) => {
    return{
      ...state,
      isLoading: true,
    }
  }),
  on(InscriptionActions.createInscriptionSuccess, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: null,
      inscriptions: [...state.inscriptions, action.data]
    }
  }),
  on(InscriptionActions.createInscriptionFailure, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: action.error,
    }
  }),


  on(InscriptionActions.resetState, () => initialState),
);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});

