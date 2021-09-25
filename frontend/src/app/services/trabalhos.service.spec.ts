import { TestBed } from '@angular/core/testing';

import { TrabalhosService } from './trabalhos.service';

describe('TrabalhosService', () => {
  let service: TrabalhosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrabalhosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
