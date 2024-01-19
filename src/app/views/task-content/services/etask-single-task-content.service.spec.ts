import { TestBed } from '@angular/core/testing';

import { EtaskSingleTaskContentService } from './etask-single-task-content.service';
import { ConfigurationService, TestConfigurationService, TranslateLibModule } from '@netgrif/components-core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';

describe('EtaskSingleTaskContentService', () => {
  let service: EtaskSingleTaskContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatSnackBarModule,
        TranslateLibModule,
        HttpClientTestingModule
      ], providers: [
        TranslateService,
        EtaskSingleTaskContentService,
        { provide: ConfigurationService, useClass: TestConfigurationService }
      ]
    });
    service = TestBed.inject(EtaskSingleTaskContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
