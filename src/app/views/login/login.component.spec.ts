import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginFormComponentModule} from '@netgrif/components';
import {AuthenticationMethodService, ConfigurationService} from '@netgrif/components-core';
import {EtaskFrontendConfigurationService} from '../../etask-frontend-configuration.service';
import {LoginComponent} from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        LoginFormComponentModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        AuthenticationMethodService,
        {provide: ConfigurationService, useClass: EtaskFrontendConfigurationService},
      ],
      declarations: [LoginComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
