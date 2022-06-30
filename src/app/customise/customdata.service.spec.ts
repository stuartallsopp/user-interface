import { TestBed } from '@angular/core/testing';

import { CustomdataService } from './customdata.service';

describe('CustomdataService', () => {
  let service: CustomdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
