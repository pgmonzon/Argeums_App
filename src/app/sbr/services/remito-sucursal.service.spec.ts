import { TestBed, inject } from '@angular/core/testing';

import { RemitoSucursalService } from './remito-sucursal.service';

describe('RemitoSucursalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemitoSucursalService]
    });
  });

  it('should be created', inject([RemitoSucursalService], (service: RemitoSucursalService) => {
    expect(service).toBeTruthy();
  }));
});
