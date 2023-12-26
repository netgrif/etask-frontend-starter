import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {
  AuthenticationMethodService,
  AuthenticationService,
  ConfigurationService,
  MaterialModule, RoleGuardService,
  SnackBarModule,
  TestConfigurationService,
  TranslateLibModule,
} from '@netgrif/components-core';
import {EtaskFrontendConfigurationService} from '../../../etask-frontend-configuration.service';

import {DashboardComponent} from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

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
        RoleGuardService
      ],
      declarations: [DashboardComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
