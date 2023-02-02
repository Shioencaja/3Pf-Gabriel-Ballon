import { Action, createReducer, on } from '@ngrx/store';
import * as StudentActions from './students.actions';
import { Student } from '../models/student.model';

export const StudentFeatureKey = 'student';

export interface State {
  data: Student[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  // READ / LECTURA
  on(StudentActions.loadStudents, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(StudentActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      data: action.data,
    };
  }),
  on(StudentActions.loadStudentsError, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  // CREATE / CREACION

  on(StudentActions.createStudent, (state) => ({ ...state, loading: true })),
  on(StudentActions.createStudentSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: [...state.data, action.data],
  })),
  on(StudentActions.resetStudentState, () => initialState)
);
