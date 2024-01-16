import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponentModule, NavigationComponentModule, PanelComponentModule } from '@netgrif/components';
import {
  ConfigurationService,
  MaterialModule,
  MockUserPreferenceService,
  MockUserService,
  NAE_TAB_DATA,
  OverflowService,
  SessionIdleTimerService,
  SimpleFilter,
  TestConfigurationService,
  TestMockDependenciesModule,
  UserPreferenceService,
  UserService,
} from '@netgrif/components-core';
import { SideNavTasksTaskViewComponent } from './side-nav-tasks-task-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MockSessionIdleTimerService } from '../../dashboard/service/mock-session-idle-timer.service';

describe('SideNavTasksTaskViewComponent', () => {
  let component: SideNavTasksTaskViewComponent;
  let fixture: ComponentFixture<SideNavTasksTaskViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HeaderComponentModule,
        PanelComponentModule,
        BrowserAnimationsModule,
        NavigationComponentModule,
        TestMockDependenciesModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: NAE_TAB_DATA, useValue: {
            baseFilter: SimpleFilter.emptyTaskFilter(),
            allowedNets: [],
            tabUniqueId: '1',
            tabSelected$: of(true),
            tabClosed$: of()
          }
        },
        OverflowService,
        { provide: ConfigurationService, useClass: TestConfigurationService },
        { provide: SessionIdleTimerService, useClass: MockSessionIdleTimerService },
        { provide: UserService, useClass: MockUserService },
        { provide: UserPreferenceService, useClass: MockUserPreferenceService },
      ],
      declarations: [SideNavTasksTaskViewComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavTasksTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
