import { TestBed, inject } from '@angular/core/testing';

import { EjercicioService } from './ejercicio.service';

describe('EjercicioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EjercicioService]
    });
  });

  it('should be created', inject([EjercicioService], (service: EjercicioService) => {
    expect(service).toBeTruthy();
  }));
});
