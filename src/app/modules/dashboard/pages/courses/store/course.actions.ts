import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Courses } from '../models';

export const CourseActions = createActionGroup({
  source: 'Course',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: Courses[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),

    'Add Course': props<{data: Omit<Courses, 'id'>}>(),
    'Add Course Success': props<{data: Courses}>(),
    'Add Course Failure': props<{error: unknown}>(),

    'Update Course By Id': props<{id: Courses['id'], data: Partial<Courses>}>(),
    'Update Course By Id Success': props<{data: Courses}>(),
    'Update Course By Id Failure': props<{error: unknown}>(),

    'Get Course By Id': props<{id: Courses['id']}>(),
    'Get Course By Id Success': props<{ data: Courses}>(),
    'Get Course By Id Failure': props<{ error: unknown }>(),

    'Delete Course By Id': props<{id: Courses['id']}>(),
    'Delete Course By Id Success': props<{id: Courses['id']}>(),
    'Delete Course By Id Failure': props<{error: unknown}>(),

    'Reset State': emptyProps(),
  }
});
