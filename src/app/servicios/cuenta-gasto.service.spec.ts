import { TestBed, inject } from '@angular/core/testing';

import { CuentaGastoService } from './cuenta-gasto.service';

describe('CuentaGastoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CuentaGastoService]
    });
  });

  it('should be created', inject([CuentaGastoService], (service: CuentaGastoService) => {
    expect(service).toBeTruthy();
  }));
});
