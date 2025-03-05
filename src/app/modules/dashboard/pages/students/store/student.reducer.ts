import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentActions } from './student.actions';
import { Student } from '../models';

export const studentFeatureKey = 'student';

export interface State {
  students: Student[];
  isLoading: boolean;
  error: unknown;
  selectedStudent: Student | null;
}

export const initialState: State = {
  students: [],
  isLoading: false,
  error: null,
  selectedStudent: null,
};

export const reducer = createReducer(
  initialState,
  on(StudentActions.loadStudents, (state) => {
    return{
      ...state,
      isLoading: true
    }
  }),
  on(StudentActions.loadStudentsSuccess, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: null,
      students: action.data
    }
  }),
  on(StudentActions.loadStudentsFailure, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: action.error
    }
  }),

  on(StudentActions.addStudent, (state) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(StudentActions.addStudentSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      students: [...state.students, action.data]
    }
  }),
  on(StudentActions.addStudentFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    }
  }),

  on(StudentActions.updateStudentById, (state) => {
    return{
      ...state,
      isLoading: true
    }
  }),
  on(StudentActions.updateStudentByIdSuccess, (state, action) => {
    return{
      ...state,
      isLoading: false,
      students: state.students.map((student) => student.id === action.data.id ? {...student, ...action.data} : student),
      error: null,
    }
  }),
  on(StudentActions.updateStudentByIdFailure, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: action.error,
    }
  }),

  on(StudentActions.getStudentById, (state) => {
    return{
      ...state,
      isLoading: true,
      selectedStudent: null
    }
  }),
  on(StudentActions.getStudentByIdSuccess, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: null,
      selectedStudent: action.data
    }
  }),
  on(StudentActions.getStudentByIdFailure, (state, action) => {
    return{
      ...state,
      isLoading: false,
      error: action.error,
      selectedCourse: null
    }
  }),

  on(StudentActions.deleteStudentById, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(StudentActions.deleteStudentByIdSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      students: state.students.filter((student) => student.id !== action.id),
      error: null,
    }
  }),
  on(StudentActions.deleteStudentByIdFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    }
  }),

  on(StudentActions.resetState, () => initialState),
);

export const studentFeature = createFeature({
  name: studentFeatureKey,
  reducer,
});

