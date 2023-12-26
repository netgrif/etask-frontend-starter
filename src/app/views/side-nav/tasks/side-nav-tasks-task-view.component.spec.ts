import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponentModule, PanelComponentModule} from '@netgrif/components';
import {
  AuthenticationMethodService,
  ConfigurationService,
  FilterType,
  MaterialModule,
  NAE_TAB_DATA,
  SimpleFilter,
} from '@netgrif/components-core';
import {EtaskFrontendConfigurationService} from '../../../etask-frontend-configuration.service';
import {SideNavTasksTaskViewComponent} from './side-nav-tasks-task-view.component';

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
      ],
      providers: [
        {provide: NAE_TAB_DATA, useValue: {baseFilter: new SimpleFilter('id', FilterType.TASK, {})}},
        AuthenticationMethodService,
        {provide: ConfigurationService, useClass: EtaskFrontendConfigurationService},
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
