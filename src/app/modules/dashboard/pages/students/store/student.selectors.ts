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

export const selectStudentCourses = createSelector(
  selectStudentState,
  (state) => state.studentCourses
);

export const selectSelectedStudentFullName = createSelector(
  selectStudentState,
  (state) => state.selectedStudent ? `${state.selectedStudent.name} ${state.selectedStudent.lastName}` : null
)
export const selectSelectedStudentPhone = createSelector(
  selectStudentState,
  (state) => state.selectedStudent?.phone
)
export const selectSelectedStudentMail = createSelector(
  selectStudentState,
  (state) => state.selectedStudent?.email
)
export const selectSelectedStudentProfile = createSelector(
  selectStudentState,
  (state) => state.selectedStudent?.profile
)
export const selectSelectedStudentGender = createSelector(
  selectStudentState,
  (state) => state.selectedStudent?.gender
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
