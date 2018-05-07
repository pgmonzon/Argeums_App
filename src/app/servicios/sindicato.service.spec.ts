import { TestBed, inject } from '@angular/core/testing';

import { SindicatoService } from './sindicato.service';

describe('SindicatoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SindicatoService]
    });
  });

  it('should be created', inject([SindicatoService], (service: SindicatoService) => {
    expect(service).toBeTruthy();
  }));
});
