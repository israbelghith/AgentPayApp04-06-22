import { TestBed } from '@angular/core/testing';

import { JwtIntercepterService } from './jwt-intercepter.service';

describe('JwtIntercepterService', () => {
  let service: JwtIntercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtIntercepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
