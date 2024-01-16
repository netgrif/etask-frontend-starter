import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthenticationMethodService,
  AuthenticationService,
  ConfigurationService,
  MaterialModule,
  MockUserPreferenceService,
  MockUserService,
  SessionIdleTimerService,
  SnackBarModule,
  TestConfigurationService,
  TranslateLibModule,
  UserPreferenceService,
  UserService,
} from '@netgrif/components-core';
import { PublicResolverComponent } from './public-resolver.component';
import { MockSessionIdleTimerService } from '../../dashboard/service/mock-session-idle-timer.service';

describe('PublicResolverComponent', () => {
  let component: PublicResolverComponent;
  let fixture: ComponentFixture<PublicResolverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        MaterialModule,
        TranslateLibModule,
        SnackBarModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: ConfigurationService, useClass: TestConfigurationService },
        { provide: UserService, useClass: MockUserService },
        { provide: UserPreferenceService, useClass: MockUserPreferenceService },
        { provide: SessionIdleTimerService, useClass: MockSessionIdleTimerService },
        AuthenticationMethodService,
        AuthenticationService,
      ],
      declarations: [PublicResolverComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
