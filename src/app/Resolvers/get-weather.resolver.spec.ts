import { TestBed } from '@angular/core/testing';

import { GetWeatherResolver } from './get-weather.resolver';

describe('GetWeatherResolver', () => {
  let resolver: GetWeatherResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetWeatherResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
