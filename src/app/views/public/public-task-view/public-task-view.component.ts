import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderComponent} from '@netgrif/components';
import {
  AbstractTaskViewComponent,
  AllowedNetsService,
  AllowedNetsServiceFactory,
  AuthenticationService,
  CaseResourceService,
  ChangedFieldsService,
  ConfigurationService,
  FieldConverterService,
  LoggerService,
  NAE_BASE_FILTER,
  NAE_VIEW_ID_SEGMENT,
  PetriNetResourceService,
  ProcessService,
  PublicCaseResourceService,
  publicFactoryResolver,
  PublicPetriNetResourceService,
  PublicProcessService,
  PublicTaskLoadingService,
  PublicTaskResourceService,
  PublicUrlResolverService,
  RedirectService,
  ResourceProvider,
  SearchService,
  SessionService,
  SnackBarService,
  TaskEventNotification,
  TaskResourceService,
  TaskViewService,
  UserService,
  ViewIdService,
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {publicBaseFilterFactory} from '../factories/etask-search-factory';

const localAllowedNetsServiceFactory = (factory: AllowedNetsServiceFactory, route: ActivatedRoute) => {
  const array = [];
  if (route.snapshot.paramMap.get('petriNetId') !== null) {
    array.push(route.snapshot.paramMap.get('petriNetId'));
  }
  return factory.createFromArray(array);
};

const processServiceFactory = (userService: UserService, sessionService: SessionService, authService: AuthenticationService,
                               router: Router, publicResolverService: PublicUrlResolverService, petriNetResource: PetriNetResourceService,
                               publicPetriNetResource: PublicPetriNetResourceService, loggerService: LoggerService, redirectService: RedirectService) => {
  return publicFactoryResolver(userService, sessionService, authService, router, publicResolverService,
    new ProcessService(petriNetResource, loggerService),
    new PublicProcessService(publicPetriNetResource, loggerService), redirectService);
};

const taskResourceServiceFactory = (userService: UserService, sessionService: SessionService, authService: AuthenticationService,
                                    router: Router, publicResolverService: PublicUrlResolverService,
                                    logger: LoggerService, provider: ResourceProvider, config: ConfigurationService,
                                    fieldConverter: FieldConverterService, redirectService: RedirectService) => {
  return publicFactoryResolver(userService, sessionService, authService, router, publicResolverService,
    new TaskResourceService(provider, config, fieldConverter, logger),
    new PublicTaskResourceService(provider, config, fieldConverter, logger), redirectService);
};

const caseResourceServiceFactory = (userService: UserService, sessionService: SessionService, authService: AuthenticationService,
                                    router: Router, publicResolverService: PublicUrlResolverService,
                                    provider: ResourceProvider, config: ConfigurationService, redirectService: RedirectService) => {
  return publicFactoryResolver(userService, sessionService, authService, router, publicResolverService,
    new CaseResourceService(provider, config),
    new PublicCaseResourceService(provider, config), redirectService);
};

@Component({
  selector: 'app-public-task-view',
  templateUrl: './public-task-view.component.html',
  styleUrls: ['./public-task-view.component.scss'],
  providers: [
    TaskViewService,
    PublicTaskLoadingService,
    SearchService,
    ChangedFieldsService,
    {
      provide: ProcessService,
      useFactory: processServiceFactory,
      deps: [UserService, SessionService, AuthenticationService, Router, PublicUrlResolverService, PetriNetResourceService,
        PublicPetriNetResourceService, LoggerService, RedirectService],
    },
    {
      provide: TaskResourceService,
      useFactory: taskResourceServiceFactory,
      deps: [UserService, SessionService, AuthenticationService, Router, PublicUrlResolverService,
        LoggerService, ResourceProvider, ConfigurationService, FieldConverterService, RedirectService],
    },
    {
      provide: CaseResourceService,
      useFactory: caseResourceServiceFactory,
      deps: [UserService, SessionService, AuthenticationService, Router, PublicUrlResolverService,
        ResourceProvider, ConfigurationService, RedirectService],
    },
    {
      provide: NAE_BASE_FILTER,
      useFactory: publicBaseFilterFactory,
      deps: [Router, ActivatedRoute, ProcessService, CaseResourceService, SnackBarService, TranslateService, PublicTaskLoadingService],
    },
    {
      provide: AllowedNetsService,
      useFactory: localAllowedNetsServiceFactory,
      deps: [AllowedNetsServiceFactory, ActivatedRoute],
    },
    {provide: NAE_VIEW_ID_SEGMENT, useValue: 'publicView'},
    {provide: AllowedNetsServiceFactory, useClass: AllowedNetsServiceFactory},
    ViewIdService,
  ],
})
export class PublicTaskViewComponent extends AbstractTaskViewComponent implements AfterViewInit {

  @ViewChild('header') public taskHeaderComponent: HeaderComponent;

  constructor(taskViewService: TaskViewService, publicTaskLoadingService: PublicTaskLoadingService) {
    super(taskViewService);
    this.loading$ = combineLatest(taskViewService.loading$, publicTaskLoadingService.loading$).pipe(
      map(sources => {
        return sources[0] || sources[1];
      }),
    );
  }

  ngAfterViewInit(): void {
    this.initializeHeader(this.taskHeaderComponent);
  }

  logEvent(event: TaskEventNotification) {
    console.log(event);
  }
}
