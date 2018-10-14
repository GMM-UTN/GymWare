import { TestBed, inject } from '@angular/core/testing';

import { MembresiaService } from './membresia.service';

describe('MembresiaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembresiaService]
    });
  });

  it('should be created', inject([MembresiaService], (service: MembresiaService) => {
    expect(service).toBeTruthy();
  }));
});
