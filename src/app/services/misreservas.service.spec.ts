import { TestBed } from '@angular/core/testing';

import { MisreservasService } from './misreservas.service';

describe('MisreservasService', () => {
  let service: MisreservasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisreservasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
