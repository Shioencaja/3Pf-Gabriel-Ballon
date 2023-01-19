import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Student } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  readonly ROOT_URL = 'https://63bdfb7ae348cb0762070d1a.mockapi.io/';

  private alumnos = new BehaviorSubject<Student[]>([]);
  public alumnos$: Observable<Student[]>;

  constructor(private readonly http: HttpClient) {
    this.alumnos$ = this.alumnos.asObservable();
  }
  createStudent(newAlumnoData: Omit<Student, 'id' | 'active'>): void {
    this.alumnos.pipe(take(1)).subscribe((alumnos) => {
      const lastId = alumnos[alumnos.length - 1]?.id || 0;
      this.alumnos.next([
        ...alumnos,
        new Student(
          lastId + 1,
          newAlumnoData.nombre,
          newAlumnoData.apellidos,
          1
        ),
      ]);
    });
  }
  editStudent(id: number, data: Partial<Student>): void {
    this.alumnos.pipe(take(1)).subscribe((alumnos) => {
      this.alumnos.next(
        alumnos.map((al) =>
          al.id === id
            ? new Student(
                al.id,
                data.nombre || al.nombre,
                data.apellidos || al.apellidos,
                data.asistencias || al.asistencias
              )
            : al
        )
      );
    });
  }
  removeStudent(id: number): void {
    this.alumnos.pipe(take(1)).subscribe((alumnos) => {
      this.alumnos.next(alumnos.filter((al) => al.id !== id));
    });
  }
  getStudentById(id: number): Observable<Student | null> {
    return this.alumnos$.pipe(
      take(1),
      map((alumnos) => alumnos.find((al) => al.id === id) || null)
    );
  }
  getAlumnos(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.ROOT_URL}alumnos`);
  }
}
