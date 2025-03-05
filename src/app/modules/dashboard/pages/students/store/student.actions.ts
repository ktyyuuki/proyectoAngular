import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../models';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: Student[] }>(),
    'Load Students Failure': props<{ error: unknown }>(),

    'Add Student': props<{data: Omit<Student, 'id'>}>(),
    'Add Student Success': props<{ data: Student }>(),
    'Add Student Failure': props<{ error: unknown }>(),

    'Update Student By Id': props<{id: Student['id'], data: Partial<Student>}>(),
    'Update Student By Id Success': props<{ data: Student }>(),
    'Update Student By Id Failure': props<{ error: unknown }>(),

    'Get Student By Id': props<{id: Student['id']}>(),
    'Get Student By Id Success': props<{ data: Student}>(),
    'Get Student By Id Failure': props<{ error: unknown }>(),

    'Delete Student By Id': props<{id: Student['id']}>(),
    'Delete Student By Id Success': props<{ id:Student['id'] }>(),
    'Delete Student By Id Failure': props<{ error: unknown }>(),

    'Load Students By Ids': props<{ studentIds: string[] }>(),
    'Load Students By Ids Success': props<{ data: Student[] }>(),
    'Load Students By Ids Failure': props<{ error: unknown }>(),

    'Reset State': emptyProps(),
  }
});
