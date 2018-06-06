import { TestBed, inject } from '@angular/core/testing';

import { LiquidacionService } from './liquidacion.service';

describe('LiquidacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiquidacionService]
    });
  });

  it('should be created', inject([LiquidacionService], (service: LiquidacionService) => {
    expect(service).toBeTruthy();
  }));
});
