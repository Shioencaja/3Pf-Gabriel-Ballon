import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, take, map } from 'rxjs';
import { Student } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private students = new BehaviorSubject<Student[]>([
    new Student(1, 'Naruto', 'Uzumaki', 5),
    new Student(2, 'Sasuke', 'Uchiha', 6),
    new Student(3, 'Sakura', 'Haruno', 8),
    new Student(4, 'Kakashi', 'Hatake', 5),
  ]);

  public students$: Observable<Student[]>;
  constructor(private http: HttpClient) {
    this.students$ = this.students.asObservable();
  }

  createStudent(newStudentData: Omit<Student, 'id' | 'active'>): void {
    this.students.pipe(take(1)).subscribe((students) => {
      const lastId = students[students.length - 1]?.id || 0;
      this.students.next([
        ...students,
        new Student(
          lastId + 1,
          newStudentData.nombre,
          newStudentData.apellidos,
          5
        ),
      ]);
    });
  }

  editStudent(id: number, data: Partial<Student>): void {
    this.students.pipe(take(1)).subscribe((students) => {
      this.students.next(
        students.map((stu) =>
          stu.id === id
            ? new Student(
                stu.id,
                data.nombre || stu.nombre,
                data.apellidos || stu.apellidos,
                data.asistencias || stu.asistencias
              )
            : stu
        )
      );
    });
  }

  removeStudent(id: number): void {
    this.students.pipe(take(1)).subscribe((students) => {
      this.students.next(students.filter((stu) => stu.id !== id));
    });
  }

  getStudentById(id: number): Observable<Student | null> {
    return this.students$.pipe(
      take(1),
      map((students) => students.find((stu) => stu.id === id) || null)
    );
  }
}
