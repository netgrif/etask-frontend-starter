import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { AuthenticationModule, AuthenticationService, ConfigurationService, LanguageService, MaterialModule, RoutingBuilderService, ViewService } from '@netgrif/components-core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TestLoggingConfigurationService } from './views/dashboard/service/test-logging-config';
import { EtaskFrontendViewService } from './etask-frontend-view.service';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        AuthenticationModule,
        TranslateModule.forRoot(),
        MaterialModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        LanguageService,
        AuthenticationService,
        TranslateService,
        RoutingBuilderService,
        { provide: ViewService, useClass: EtaskFrontendViewService},
        { provide: ConfigurationService, useClass: TestLoggingConfigurationService },
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'etask'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('etask');
  });
});
