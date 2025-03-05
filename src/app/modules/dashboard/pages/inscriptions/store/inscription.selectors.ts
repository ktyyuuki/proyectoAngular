import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscription from './inscription.reducer';

export const selectInscriptionState = createFeatureSelector<fromInscription.State>(
  fromInscription.inscriptionFeatureKey
);

export const selectInscriptions = createSelector(
  selectInscriptionState,
  (state) => state.inscriptions
)

export const selectInscriptionsCount = createSelector(
  selectInscriptionState,
  (state) => state.inscriptions.length
)

export const selectIsLoadingInscriptions = createSelector(
  selectInscriptionState,
  (state) => state.isLoading
)

export const selectInscriptionError = createSelector(
  selectInscriptionState,
  (state) => state.error
)
