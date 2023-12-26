import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponentModule} from '@netgrif/components';
import {
  AuthenticationMethodService,
  CaseHeaderService,
  ConfigurationService,
  MaterialModule,
  MockAuthenticationMethodService,
  NAE_TAB_DATA,
} from '@netgrif/components-core';
import {EtaskFrontendConfigurationService} from '../../../etask-frontend-configuration.service';
import {SideNavCasesCaseViewComponent} from './side-nav-cases-case-view.component';

describe('SideNavCasesCaseViewComponent', () => {
  let component: SideNavCasesCaseViewComponent;
  let fixture: ComponentFixture<SideNavCasesCaseViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        HeaderComponentModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
        {provide: NAE_TAB_DATA, useValue: {tabViewComponent: undefined, tabViewOrder: 1}},
        {provide: ConfigurationService, useClass: EtaskFrontendConfigurationService},
        CaseHeaderService,
      ],
      declarations: [SideNavCasesCaseViewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavCasesCaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
