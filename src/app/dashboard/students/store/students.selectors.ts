import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudent from './students.reducer';

export const selectStudentState = createFeatureSelector<fromStudent.State>(
  fromStudent.StudentFeatureKey
);
