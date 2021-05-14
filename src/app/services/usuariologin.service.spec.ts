import { TestBed } from '@angular/core/testing';

import { UsuariologinService } from './usuariologin.service';

describe('UsuariologinService', () => {
  let service: UsuariologinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariologinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
