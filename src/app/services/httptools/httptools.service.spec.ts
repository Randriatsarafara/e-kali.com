import { TestBed } from '@angular/core/testing';

import { HttptoolsService } from './httptools.service';

describe('HttptoolsService', () => {
  let service: HttptoolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttptoolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
