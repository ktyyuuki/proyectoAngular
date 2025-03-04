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

  on(InscriptionActions.updateInscriptionById, (state) => {
    return{
      ...state,
      isLoading: true,
    }
  }),
  on(InscriptionActions.updateInscriptionByIdSuccess, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: null,
      inscriptions: state.inscriptions.map(
        (inscription) => inscription.id === action.data.id ? {...inscription, ...action.data} : inscription
      )
    }
  }),
  on(InscriptionActions.updateInscriptionByIdFailure, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: action.error,
    }
  }),

  on(InscriptionActions.deleteInscriptionById, (state) => {
    return{
      ...state,
      isLoading: true,
    }
  }),
  on(InscriptionActions.deleteInscriptionByIdSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      inscriptions: state.inscriptions.filter((inscription) => inscription.id !== action.id),
    }
  }),
  on(InscriptionActions.deleteInscriptionByIdFailure, (state, action) => {
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

