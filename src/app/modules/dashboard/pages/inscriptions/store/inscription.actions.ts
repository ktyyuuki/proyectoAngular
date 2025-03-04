import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscription } from '../models';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    // Disparador de una secuencia de acciones
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: Inscription[] }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),

    'Create Inscription': props<{data: Omit<Inscription, 'id'> }>(),
    'Create Inscription Success': props<{data: Inscription }>(),
    'Create Inscription Failure': props<{error: unknown }>(),

    'Reset State': emptyProps(),
  }
});
