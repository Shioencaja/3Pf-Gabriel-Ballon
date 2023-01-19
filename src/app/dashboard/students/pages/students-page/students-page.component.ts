import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from 'src/app/core/models';
import { StudentModalComponent } from '../../components/student-modal/student-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from '../../services/students.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AlumnosService } from '../../services/alumnos.service';
@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss'],
})
export class StudentsPageComponent implements OnDestroy {
  displayedColumns = [
    'id',
    'nombre',
    'apellidos',
    'asistencias',
    'delete',
    'edit',
  ];
  students: Observable<Student[]>;
  alumnos: Observable<Student[]>;
  private destroyed$ = new Subject();

  constructor(
    private readonly studentsService: StudentsService,
    private readonly dialogService: MatDialog,
    private readonly alumnosService: AlumnosService
  ) {
    this.students = this.studentsService.students$;
    this.alumnos = this.alumnosService.getAlumnos();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  editStudent(element: Student) {
    const dialog = this.dialogService.open(StudentModalComponent, {
      data: element,
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.alumnosService.editStudent(element.id, data);
      }
    });
  }

  createStudent() {
    const dialog = this.dialogService.open(StudentModalComponent);
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.alumnosService.createStudent({
          nombre: data.nombre,
          apellidos: data.apellidos,
          asistencias: 5,
        });
      }
    });
  }

  deleteStudent(element: Student) {
    this.alumnosService.removeStudent(element.id);
  }

  print() {
    console.log(this.alumnos);
  }
}
