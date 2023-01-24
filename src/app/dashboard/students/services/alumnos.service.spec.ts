import { TestBed } from '@angular/core/testing';

import { AlumnosService } from './alumnos.service';

describe('AlumnosService', () => {
  let service: AlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnosService);
  });

  it('Tiene que ser creado', () => {
    expect(service).toBeTruthy();
  });
  it('Tiene que tener un método llamado getAlumnos', () => {
    const nombre = service.getAlumnos();
    expect(nombre).toMatch('Alumnos');
  });
});
