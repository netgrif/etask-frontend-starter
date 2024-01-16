import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule, } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AllowedNetsService,
  AllowedNetsServiceFactory,
  AuthenticationMethodService,
  AuthenticationService,
  ConfigurationService,
  FilterType,
  MaterialModule,
  MockAuthenticationMethodService,
  MockAuthenticationService,
  MockUserPreferenceService,
  MockUserResourceService,
  MockUserService,
  NAE_BASE_FILTER,
  NAE_TAB_DATA,
  SearchService,
  SessionIdleTimerService,
  SimpleFilter,
  TaskViewService,
  TestTaskViewAllowedNetsFactory,
  TranslateLibModule,
  UserPreferenceService,
  UserResourceService,
  UserService,
} from '@netgrif/components-core';
import { EtaskFrontendConfigurationService } from '../../../etask-frontend-configuration.service';
import { PublicSingleTaskViewComponent } from './public-single-task-view.component';
import { HeaderComponentModule, PanelComponentModule } from '@netgrif/components';
import { Observable } from 'rxjs';
import { TestConfigurationService } from '../../dashboard/service/test-config';
import { MockSessionIdleTimerService } from '../../dashboard/service/mock-session-idle-timer.service';

describe('PublicSingleTaskViewComponent', () => {
  let component: PublicSingleTaskViewComponent;
  let fixture: ComponentFixture<PublicSingleTaskViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateLibModule,
        HeaderComponentModule,
        PanelComponentModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: UserResourceService, useClass: MockUserResourceService },
        {
          provide: NAE_TAB_DATA,
          useValue: { baseFilter: new SimpleFilter('id', FilterType.TASK, {}), tabSelected$: new Observable() }
        },
        { provide: UserService, useClass: MockUserService },
        { provide: UserPreferenceService, useClass: MockUserPreferenceService },
        { provide: ConfigurationService, useClass: TestConfigurationService },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService },
        TaskViewService,
        { provide: AllowedNetsService, useFactory: TestTaskViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory] },
        SearchService,
        { provide: NAE_BASE_FILTER, useValue: { filter: SimpleFilter.emptyTaskFilter() } },
        { provide: SessionIdleTimerService, useClass: MockSessionIdleTimerService }

      ],
      declarations: [PublicSingleTaskViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSingleTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
