import { TestBed, inject } from '@angular/core/testing';

import { UnidadService } from './unidad.service';

describe('UnidadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnidadService]
    });
  });

  it('should be created', inject([UnidadService], (service: UnidadService) => {
    expect(service).toBeTruthy();
  }));
});
