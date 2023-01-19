import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Cursos {
  nombre: String;
  fechaFinal: Date;
  id: String;
}

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  readonly ROOT_URL = 'https://63bdfb7ae348cb0762070d1a.mockapi.io/';
  private cursos = new BehaviorSubject<Cursos[]>([]);
  public cursos$: Observable<Cursos[]>;
  constructor(private httpClient: HttpClient) {
    this.cursos$ = this.cursos.asObservable();
  }
  loadCursos() {
    this.httpClient
      .get<Cursos[]>(`${this.ROOT_URL}/cursos`)
      .subscribe((apiCursos) => {
        this.cursos.next(apiCursos);
      });
  }
}
