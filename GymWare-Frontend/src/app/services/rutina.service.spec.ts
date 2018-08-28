import { TestBed, inject } from '@angular/core/testing';

import { RutinaService } from './rutina.service';

describe('RutinaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RutinaService]
    });
  });

  it('should be created', inject([RutinaService], (service: RutinaService) => {
    expect(service).toBeTruthy();
  }));
});
