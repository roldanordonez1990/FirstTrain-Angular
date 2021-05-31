import { TestBed } from '@angular/core/testing';

import { TodasLasReservasService } from './todas-las-reservas.service';

describe('TodasLasReservasService', () => {
  let service: TodasLasReservasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodasLasReservasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
