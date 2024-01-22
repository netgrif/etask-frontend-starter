import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ETaskDoubleDrawerComponent } from './e-task-double-drawer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AuthenticationMethodService, AuthenticationModule, AuthenticationService, ConfigurationService, ImpersonationService, MaterialModule, MockAuthenticationMethodService, MockAuthenticationService, MockUserPreferenceService, MockUserResourceService, MockUserService, SessionIdleTimerService, TestConfigurationService, TranslateLibModule, UserPreferenceService, UserResourceService, UserService } from '@netgrif/components-core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { QuickPanelComponentModule, UserComponentModule } from '@netgrif/components';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResizableModule } from 'angular-resizable-element';
import { MockUriResourceService } from '../../dashboard/service/mock-uri-resource.service';
import { EtaskUriResourceService } from '../../dashboard/service/etask-uri-resource.service';
import { MockSessionIdleTimerService } from '../../dashboard/service/mock-session-idle-timer.service';

xdescribe('ETaskDoubleDrawerComponent', () => {
  let component: ETaskDoubleDrawerComponent;
  let fixture: ComponentFixture<ETaskDoubleDrawerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ETaskDoubleDrawerComponent],
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        MaterialModule,
        FlexModule,
        FlexLayoutModule,
        QuickPanelComponentModule,
        UserComponentModule,
        NoopAnimationsModule,
        TranslateLibModule,
        HttpClientTestingModule,
        ResizableModule,
        AuthenticationModule,
      ],
      providers: [
        { provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService },
        { provide: ConfigurationService, useClass: TestConfigurationService },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: UserResourceService, useClass: MockUserResourceService },
        { provide: EtaskUriResourceService, useClass: MockUriResourceService },
        { provide: SessionIdleTimerService, useClass: MockSessionIdleTimerService },
        { provide: UserPreferenceService, useClass: MockUserPreferenceService },
        { provide: UserService, useClass: MockUserService },
        // { provide: ImpersonationService, useClass: MockImpersonationService}
      ],
    })
      .compileComponents();
      fixture = TestBed.createComponent(ETaskDoubleDrawerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
