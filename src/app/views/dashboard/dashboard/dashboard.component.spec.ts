import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {
  AuthenticationGuardService,
  AuthenticationMethodService,
  AuthenticationService,
  AuthorityGuardService,
  ConfigurationService,
  GroupGuardService,
  MaterialModule, RoleGuardService,
  SnackBarModule,
  TestConfigurationService,
  TranslateLibModule,
  UriService,
} from '@netgrif/components-core';

import {DashboardComponent} from './dashboard.component';
import { EtaskUriService } from '../service/etask-uri.service';
import { MockUriResourceService } from '../service/mock-uri-resource.service';

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
        {provide: ConfigurationService, useClass: TestConfigurationService},
        {provide: EtaskUriService, useClass: MockUriResourceService},
        AuthenticationMethodService,
        AuthenticationService,
        RoleGuardService,
        AuthenticationGuardService,
        AuthorityGuardService,
        GroupGuardService,
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
