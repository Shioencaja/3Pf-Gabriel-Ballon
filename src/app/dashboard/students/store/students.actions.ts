import { createAction, props } from '@ngrx/store';
import { Student } from '../models/student.model';

export const loadStudents = createAction('[Students] Load Students Success');

export const loadStudentsSuccess = createAction(
  '[Students] Load Student Success',
  props<{ data: Student[] }>()
);

export const loadStudentsError = createAction(
  '[Students] Load Student Error',
  props<{ error: unknown }>()
);

export const createStudent = createAction(
  '[Students] Create Student',
  props<{ data: { nombre: string; apellidos: string; asistencias: number } }>()
);

export const createStudentSuccess = createAction(
  '[Students] Create Student Success',
  props<{ data: Student }>()
);

export const createStudentFailure = createAction(
  '[Students] Create Student Failure',
  props<{ error: unknown }>()
);

export const editStudent = createAction(
  '[Students] Edit Student',
  props<{
    data: Student;
  }>()
);

export const editStudentSuccess = createAction(
  '[Students] Edit Student Success',
  props<{ data: Student }>()
);

export const editStudentFailure = createAction(
  '[Students] Edit Student Failure',
  props<{ error: unknown }>()
);

export const deleteStudent = createAction(
  '[Students] Delete Student',
  props<{ data: { id: number } }>()
);

export const deleteStudentSuccess = createAction(
  '[Students] Delete Student Success',
  props<{ data: number }>()
);

export const deleteStudentFailure = createAction(
  '[Students] Delete Student Failure',
  props<{ error: unknown }>()
);

export const resetStudentState = createAction('[Students] Reset Student State');
