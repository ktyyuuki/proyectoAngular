import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from './course.reducer';

export const selectCourseState = createFeatureSelector<fromCourse.State>(
  fromCourse.courseFeatureKey
);

export const selectCourses = createSelector(
  selectCourseState,
  (state) => state.courses
)

export const selectCoursesCount = createSelector(
  selectCourseState,
  (state) => state.courses.length
)

export const selectIsLoadingCourses = createSelector(
  selectCourseState,
  (state) => state.isLoading
)

export const selectCoursesError = createSelector(
  selectCourseState,
  (state) => state.error
)

export const selectSelectedCourse = createSelector(
  selectCourseState,
  (state) => state.selectedCourse
)
