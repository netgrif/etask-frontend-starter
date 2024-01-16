import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PublicWorkflowViewComponent } from './public-workflow-view.component';
import { AuthenticationMethodService, AuthenticationService, ConfigurationService, MaterialModule, MockAuthenticationMethodService, MockAuthenticationService, MockUserPreferenceService, MockUserResourceService, MockUserService, SessionIdleTimerService, TestConfigurationService, TestViewService, TranslateLibModule, UserPreferenceService, UserResourceService, UserService, ViewService } from '@netgrif/components-core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponentModule, SideMenuContentComponentModule } from '@netgrif/components';
import { MockSessionIdleTimerService } from '../../dashboard/service/mock-session-idle-timer.service';

describe('PublicWorkflowViewComponent', () => {
  let component: PublicWorkflowViewComponent;
  let fixture: ComponentFixture<PublicWorkflowViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PublicWorkflowViewComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MaterialModule,
        TranslateLibModule,
        HeaderComponentModule,
        SideMenuContentComponentModule,
      ],
      providers: [
        { provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: UserResourceService, useClass: MockUserResourceService },
        { provide: ConfigurationService, useClass: TestConfigurationService },
        { provide: ViewService, useClass: TestViewService },
        { provide: SessionIdleTimerService, useClass: MockSessionIdleTimerService },
        { provide: UserService, useClass: MockUserService },
        { provide: UserPreferenceService, useClass: MockUserPreferenceService },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicWorkflowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
