import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PublicTaskViewComponent } from './public-task-view.component';
import { HeaderComponentModule, SideMenuContentComponentModule } from '@netgrif/components';
import { AuthenticationMethodService, AuthorityGuardService, ConfigurationService, MaterialModule, MockAuthenticationMethodService, MockUserPreferenceService, MockUserService, SessionIdleTimerService, TestConfigurationService, TranslateLibModule, UserPreferenceService, UserService } from '@netgrif/components-core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockSessionIdleTimerService } from '../../dashboard/service/mock-session-idle-timer.service';

describe('PublicTaskViewComponent', () => {
  let component: PublicTaskViewComponent;
  let fixture: ComponentFixture<PublicTaskViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
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
        { provide: ConfigurationService, useClass: TestConfigurationService },
        { provide: SessionIdleTimerService, useClass: MockSessionIdleTimerService },
        { provide: UserService, useClass: MockUserService },
        { provide: UserPreferenceService, useClass: MockUserPreferenceService },
        AuthorityGuardService,
      ],
      declarations: [PublicTaskViewComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
