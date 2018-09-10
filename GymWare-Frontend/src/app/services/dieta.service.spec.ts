import { TestBed, inject } from '@angular/core/testing';

import { DietaService } from './dieta.service';

describe('DietaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DietaService]
    });
  });

  it('should be created', inject([DietaService], (service: DietaService) => {
    expect(service).toBeTruthy();
  }));
});
