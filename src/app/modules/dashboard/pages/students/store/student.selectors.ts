import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudent from './student.reducer';
import { Student } from '../models';

export const selectStudentState = createFeatureSelector<fromStudent.State>(
  fromStudent.studentFeatureKey
);

export const selectStudents = createSelector(
  selectStudentState,
  (state) => state.students
)

export const selectSelectedStudent = createSelector(
  selectStudentState,
  (state) => state.selectedStudent
)

export const selectStudentsCount = createSelector(
  selectStudentState,
  (state) => state.students.length
)

export const selectIsLoadingStudents = createSelector(
  selectStudentState,
  (state) => state.isLoading
)

export const selectStudentsError = createSelector(
  selectStudentState,
  (state) => state.error
)

export const selectStudentsByIds = (studentIds: Student['id'][]) => createSelector(
  selectStudentState,
  (state) => state.students.filter(student => studentIds.includes(student.id))
);
