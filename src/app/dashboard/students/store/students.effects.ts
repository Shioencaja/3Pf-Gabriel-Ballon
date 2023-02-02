import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as StudentsActions from './students.actions';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';

@Injectable()
export class StudentsEffects {
  private baseURL = 'https://63bdfb7ae348cb0762070d1a.mockapi.io';

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      concatMap(() =>
        this.getStudentsFromApi().pipe(
          map((data) => StudentsActions.loadStudentsSuccess({ data })),
          catchError((error) =>
            of(StudentsActions.loadStudentsError({ error }))
          )
        )
      )
    );
  });

  createStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.createStudent),
      concatMap((action) =>
        this.createStudent(action.data).pipe(
          map((response) =>
            StudentsActions.createStudentSuccess({ data: response })
          ),
          catchError((error) =>
            of(StudentsActions.createStudentFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private actions$: Actions, private httpClient: HttpClient) {}
  private getStudentsFromApi(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseURL}/alumnos`);
  }
  private createStudent(data: {
    nombre: string;
    apellidos: string;
    asistencias: number;
  }): Observable<Student> {
    return this.httpClient.post<Student>(`${this.baseURL}/alumnos`, data);
  }
}
