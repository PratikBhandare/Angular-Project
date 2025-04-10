import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userProfileResolverGuard } from './user-profile-resolver.guard';

describe('userProfileResolverGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userProfileResolverGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
