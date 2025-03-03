import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscription } from '../models';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: unknown }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),
    'Create Inscription': props<{data: Omit<Inscription, 'id'> }>(),
    'Reset State': emptyProps(),
  }
});
