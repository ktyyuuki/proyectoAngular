import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudent from './student.reducer';

export const selectStudentState = createFeatureSelector<fromStudent.State>(
  fromStudent.studentFeatureKey
);

export const selectStudents = createSelector(
  selectStudentState,
  (state) => state.students
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
