import { TestBed } from '@angular/core/testing';
import { GroupNavigationComponentResolverService, TestMockDependenciesModule } from '@netgrif/components-core';

import { EtaskGroupNavigationComponentResolverService } from './etask-group-navigation-component-resolver.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('EtaskGroupNavigationComponentResolverService', () => {
  let service: EtaskGroupNavigationComponentResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        TestMockDependenciesModule
      ],
      providers: [
        { provide: GroupNavigationComponentResolverService, useClass: EtaskGroupNavigationComponentResolverService },
      ],
    });
    service = TestBed.inject(EtaskGroupNavigationComponentResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
