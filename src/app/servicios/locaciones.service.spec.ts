import { TestBed, inject } from '@angular/core/testing';

import { LocacionesService } from './locaciones.service';

describe('LocacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocacionesService]
    });
  });

  it('should be created', inject([LocacionesService], (service: LocacionesService) => {
    expect(service).toBeTruthy();
  }));
});
