import { TestBed } from '@angular/core/testing';

import { HhtpInterceptorService } from './hhtp-interceptor.service';

describe('HhtpInterceptorService', () => {
  let service: HhtpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HhtpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
