import { TestBed, inject } from '@angular/core/testing';

import { IngresoSucursalService } from './ingreso-sucursal.service';

describe('IngresoSucursalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngresoSucursalService]
    });
  });

  it('should be created', inject([IngresoSucursalService], (service: IngresoSucursalService) => {
    expect(service).toBeTruthy();
  }));
});
