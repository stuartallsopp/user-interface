import { TestBed } from '@angular/core/testing';

import { MdlCommonService } from './mdl-common.service';

describe('MdlCommonService', () => {
  let service: MdlCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdlCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
