import { TestBed } from '@angular/core/testing';

import { ExposicoesService } from './exposicoes.service';

describe('ExposicoesService', () => {
  let service: ExposicoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExposicoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
