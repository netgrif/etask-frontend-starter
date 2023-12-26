import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {
  AuthenticationMethodService,
  AuthenticationService,
  ConfigurationService,
  MaterialModule,
  TranslateLibModule,
} from '@netgrif/components-core';
import {EtaskFrontendConfigurationService} from '../../../etask-frontend-configuration.service';

import {EtaskUriResourceService} from './etask-uri-resource.service';

describe('EtaskUriResourceService', () => {
  let service: EtaskUriResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        TranslateLibModule,
      ],
      providers: [
        {provide: ConfigurationService, useClass: EtaskFrontendConfigurationService},
        AuthenticationMethodService,
        AuthenticationService,
      ],
    });
    service = TestBed.inject(EtaskUriResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
