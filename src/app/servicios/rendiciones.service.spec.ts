import { TestBed, inject } from '@angular/core/testing';

import { RendicionesService } from './rendiciones.service';

describe('RendicionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RendicionesService]
    });
  });

  it('should be created', inject([RendicionesService], (service: RendicionesService) => {
    expect(service).toBeTruthy();
  }));
});
