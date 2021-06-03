import { TestBed } from '@angular/core/testing';

import { UpdateMyuserService } from './update-myuser.service';

describe('UpdateMyuserService', () => {
  let service: UpdateMyuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateMyuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
