import { Component, OnInit } from '@angular/core';
import { Cursos, CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  displayedColumns = ['id', 'nombre', 'fechaFinal'];
  constructor(public cursosService: CursosService) {}

  ngOnInit(): void {
    this.cursosService.loadCursos();
  }
}
