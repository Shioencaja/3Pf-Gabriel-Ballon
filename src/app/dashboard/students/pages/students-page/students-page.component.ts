import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentModalComponent } from '../../components/student-modal/student-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  createStudent,
  deleteStudent,
  editStudent,
  loadStudents,
  resetStudentState,
} from '../../store/students.actions';
import { Student } from '../../models/student.model';
import { selectStudentState } from '../../store/students.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss'],
})
export class StudentsPageComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'nombre', 'apellidos', 'asistencias'];
  students: Student[] = [];
  loading = true;

  constructor(
    private readonly store: Store,
    private readonly dialogService: MatDialog
  ) {
    this.store.dispatch(loadStudents());
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetStudentState());
  }

  ngOnInit(): void {
    this.store.select(selectStudentState).subscribe((state) => {
      this.students = state.data;
      this.loading = state.loading;
    });
  }

  createStudent() {
    const dialog = this.dialogService.open(StudentModalComponent);
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        // console.log(data);
        this.store.dispatch(createStudent({ data }));
      }
    });
  }
  resetStudent() {
    this.store.dispatch(resetStudentState());
  }
}
