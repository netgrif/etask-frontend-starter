import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {
  AuthenticationMethodService,
  AuthenticationService,
  ConfigurationService,
  MaterialModule,
  SnackBarModule,
  TranslateLibModule,
} from '@netgrif/components-core';
import {EtaskFrontendConfigurationService} from '../../../etask-frontend-configuration.service';

import {PublicSingleTaskViewComponent} from './public-single-task-view.component';

describe('PublicSingleTaskViewComponent', () => {
  let component: PublicSingleTaskViewComponent;
  let fixture: ComponentFixture<PublicSingleTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        MaterialModule,
        TranslateLibModule,
        SnackBarModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {provide: ConfigurationService, useClass: EtaskFrontendConfigurationService},
        AuthenticationMethodService,
        AuthenticationService,
      ],
      declarations: [PublicSingleTaskViewComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSingleTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
