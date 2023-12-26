import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {NavigationComponentModule, ToolbarComponentModule} from '@netgrif/components';
import {AuthenticationMethodService, ConfigurationService, MaterialModule} from '@netgrif/components-core';
import {EtaskFrontendConfigurationService} from '../../etask-frontend-configuration.service';
import {SidenavComponent} from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ToolbarComponentModule,
        NavigationComponentModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        AuthenticationMethodService,
        {provide: ConfigurationService, useClass: EtaskFrontendConfigurationService},
      ],
      declarations: [SidenavComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
