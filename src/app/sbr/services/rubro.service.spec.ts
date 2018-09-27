import { TestBed, inject } from '@angular/core/testing';

import { RubroService } from './rubro.service';

describe('RubroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RubroService]
    });
  });

  it('should be created', inject([RubroService], (service: RubroService) => {
    expect(service).toBeTruthy();
  }));
});
