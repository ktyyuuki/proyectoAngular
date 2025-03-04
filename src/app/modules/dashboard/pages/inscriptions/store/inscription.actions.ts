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

    'Update Inscription by Id': props<{id: Inscription['id'], data: Partial<Inscription> }>(),
    'Update Inscription by Id Success': props<{data: Inscription }>(),
    'Update Inscription by Id Failure': props<{error: unknown }>(),

    'Delete Inscription by Id': props<{id: Inscription['id'] }>(),
    'Delete Inscription by Id Success': props<{id: Inscription['id'] }>(),
    'Delete Inscription by Id Failure': props<{error: unknown }>(),

    'Reset State': emptyProps(),
  }
});
