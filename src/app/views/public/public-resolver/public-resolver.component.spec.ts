import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {
  AuthenticationMethodService,
  AuthenticationService,
  ConfigurationService,
  MaterialModule,
  SnackBarModule,
  TranslateLibModule,
} from '@netgrif/components-core';
import {EtaskFrontendConfigurationService} from '../../../etask-frontend-configuration.service';

import {PublicResolverComponent} from './public-resolver.component';

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
        {provide: ConfigurationService, useClass: EtaskFrontendConfigurationService},
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
