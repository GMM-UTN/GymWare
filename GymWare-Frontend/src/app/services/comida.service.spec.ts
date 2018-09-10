import { TestBed, inject } from '@angular/core/testing';

import { ComidaService } from './comida.service';

describe('ComidaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComidaService]
    });
  });

  it('should be created', inject([ComidaService], (service: ComidaService) => {
    expect(service).toBeTruthy();
  }));
});
