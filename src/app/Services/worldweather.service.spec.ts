import { TestBed } from '@angular/core/testing';

import { WorldweatherService } from './worldweather.service';

describe('WorldweatherService', () => {
  let service: WorldweatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldweatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
