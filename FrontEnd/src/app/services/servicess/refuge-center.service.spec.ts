import { TestBed } from '@angular/core/testing';

import { RefugeCenterService } from './refuge-center.service';

describe('RefugeCenterService', () => {
  let service: RefugeCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefugeCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
