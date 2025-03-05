import { createFeature, createReducer, on } from '@ngrx/store';
import { CourseActions } from './course.actions';
import { Courses } from '../models';

export const courseFeatureKey = 'course';

export interface State {
  courses: Courses[];
  isLoading: boolean;
  error: unknown;
  selectedCourse: Courses | null;
}

export const initialState: State = {
  courses: [],
  isLoading: false,
  error: null,
  selectedCourse: null
};

export const reducer = createReducer(
  initialState,
  on(CourseActions.loadCourses, (state) => {
    return{
      ...state,
      isLoading: true,
    }
  }),
  on(CourseActions.loadCoursesSuccess, (state, action) => {
    return{
      ...state,
      courses: action.data,
      isLoading: false,
      error: null,
    }
  }),
  on(CourseActions.loadCoursesFailure, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: action.error
    }
  }),

  on(CourseActions.addCourse, (state) => {
    return{
      ...state,
      isLoading: true,
    }
  }),
  on(CourseActions.addCourseSuccess, (state, action) => {
    return{
      ...state,
      courses: [...state.courses, action.data],
      isLoading: false,
      error: null,
    }
  }),
  on(CourseActions.addCourseFailure, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: action.error
    }
  }),

  on(CourseActions.updateCourseById, (state) => {
    return{
      ...state,
      isLoading: true,
    }
  }),
  on(CourseActions.updateCourseByIdSuccess, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: null,
      courses: state.courses.map(
        (course) => course.id === action.data.id
          ? {...course, ...action.data} : course
      ),
    }
  }),
  on(CourseActions.updateCourseByIdFailure, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: action.error
    }
  }),

  on(CourseActions.getCourseById, (state) => {
    return{
      ...state,
      isLoading: true,
      selectedCourse: null
    }
  }),
  on(CourseActions.getCourseByIdSuccess, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: null,
      selectedCourse: action.data
    }
  }),
  on(CourseActions.getCourseByIdFailure, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: action.error,
      selectedCourse: null
    }
  }),

  on(CourseActions.deleteCourseById, (state) => {
    return{
      ...state,
      isLoading: true,
    }
  }),
  on(CourseActions.deleteCourseByIdSuccess, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: null,
      courses: state.courses.filter(
        (course) => course.id !== action.id
      ),
    }
  }),
  on(CourseActions.deleteCourseByIdFailure, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: action.error
    }
  }),

  on(CourseActions.resetState, () => initialState),
);

export const courseFeature = createFeature({
  name: courseFeatureKey,
  reducer,
});

