import { TestBed, inject } from '@angular/core/testing';

import { TransportistaService } from './transportista.service';

describe('TransportistaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportistaService]
    });
  });

  it('should be created', inject([TransportistaService], (service: TransportistaService) => {
    expect(service).toBeTruthy();
  }));
});
