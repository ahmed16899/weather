import { TestBed } from '@angular/core/testing';

import { HomerResolver } from './homer.resolver';

describe('HomerResolver', () => {
  let resolver: HomerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HomerResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
