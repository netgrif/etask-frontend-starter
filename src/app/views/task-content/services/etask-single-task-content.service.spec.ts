import {TestBed} from '@angular/core/testing';

import {EtaskSingleTaskContentService} from './etask-single-task-content.service';

describe('EtaskSingleTaskContentService', () => {
  let service: EtaskSingleTaskContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtaskSingleTaskContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
