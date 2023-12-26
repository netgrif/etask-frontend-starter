import {TestBed} from '@angular/core/testing';
import {GroupNavigationComponentResolverService} from '@netgrif/components-core';

import {EtaskGroupNavigationComponentResolverService} from './etask-group-navigation-component-resolver.service';

describe('EtaskGroupNavigationComponentResolverService', () => {
  let service: EtaskGroupNavigationComponentResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {provide: GroupNavigationComponentResolverService, useClass: EtaskGroupNavigationComponentResolverService},
      ],
    });
    service = TestBed.inject(EtaskGroupNavigationComponentResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
