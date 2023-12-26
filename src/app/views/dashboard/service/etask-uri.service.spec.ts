import {TestBed} from '@angular/core/testing';

import {EtaskUriService} from './etask-uri.service';

describe('ETaskUriService', () => {
  let service: EtaskUriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtaskUriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
