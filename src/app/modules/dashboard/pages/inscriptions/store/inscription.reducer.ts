import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { Inscription } from '../models';

export const inscriptionFeatureKey = 'inscription';

export interface State {
  inscriptions: Inscription[];
}

export const initialState: State = {
  inscriptions: [],
};

export const reducer = createReducer(
  initialState,
  on(InscriptionActions.loadInscriptions, (state) => {
    return {
      ...state,
      inscriptions: [
        {
          id: "1",
          studentId: "asd2",
          courseId: "jav34i",

        },
        {
          id: "2",
          studentId: "asd2",
          courseId: "ange75"
        },
      ]
    }
  }),
  on(InscriptionActions.createInscription, (state, action) => {
    return{
      ...state,
      inscriptions: [...state.inscriptions, { id: 'adse', ...action.data }]
    }
  }),

  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => state),
  on(InscriptionActions.loadInscriptionsFailure, (state, action) => state),
  on(InscriptionActions.resetState, () => initialState),
);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});

