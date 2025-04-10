import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { blogResolverGuard } from './blog-resolver.guard';

describe('blogResolverGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => blogResolverGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
