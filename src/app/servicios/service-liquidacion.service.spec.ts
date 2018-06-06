import { TestBed, inject } from '@angular/core/testing';

import { ServiceLiquidacionService } from './service-liquidacion.service';

describe('ServiceLiquidacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceLiquidacionService]
    });
  });

  it('should be created', inject([ServiceLiquidacionService], (service: ServiceLiquidacionService) => {
    expect(service).toBeTruthy();
  }));
});
