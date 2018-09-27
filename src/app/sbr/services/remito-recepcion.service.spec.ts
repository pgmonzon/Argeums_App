import { TestBed, inject } from '@angular/core/testing';

import { RemitoRecepcionService } from './remito-recepcion.service';

describe('RemitoRecepcionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemitoRecepcionService]
    });
  });

  it('should be created', inject([RemitoRecepcionService], (service: RemitoRecepcionService) => {
    expect(service).toBeTruthy();
  }));
});
