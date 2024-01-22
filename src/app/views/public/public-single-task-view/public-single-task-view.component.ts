import {AsyncPipe} from '@angular/common';
import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderComponent} from '@netgrif/components';
import {
  AbstractSingleTaskViewComponent,
  AllowedNetsService,
  AllowedNetsServiceFactory,
  AuthenticationService,
  BaseFilter,
  CaseResourceService,
  ChangedFieldsService,
  ConfigurationService,
  FieldConverterService,
  FinishTaskService,
  LoggerService,
  NAE_BASE_FILTER,
  NAE_TASK_OPERATIONS,
  NAE_VIEW_ID_SEGMENT,
  PetriNetResourceService,
  ProcessService,
  publicBaseFilterFactory,
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
  SingleTaskContentService,
  SnackBarService,
  SubjectTaskOperations,
  TaskContentService,
  TaskDataService,
  TaskEventNotification,
  TaskEventService,
  TaskRequestStateService,
  TaskResourceService,
  TaskViewService,
  UserService,
  ViewIdService,
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

const taskResourceServiceFactory = (userService: UserService, sessionService: SessionService, authService: AuthenticationService,
                                    router: Router, publicResolverService: PublicUrlResolverService,
                                    logger: LoggerService, provider: ResourceProvider, config: ConfigurationService,
                                    fieldConverter: FieldConverterService, redirectService: RedirectService) => {
  return publicFactoryResolver(userService, sessionService, authService, router, publicResolverService,
    new TaskResourceService(provider, config, fieldConverter, logger),
    new PublicTaskResourceService(provider, config, fieldConverter, logger), redirectService);
};

const processServiceFactory = (userService: UserService, sessionService: SessionService, authService: AuthenticationService,
                               router: Router, publicResolverService: PublicUrlResolverService, petriNetResource: PetriNetResourceService,
                               publicPetriNetResource: PublicPetriNetResourceService, loggerService: LoggerService, redirectService: RedirectService) => {
  return publicFactoryResolver(userService, sessionService, authService, router, publicResolverService,
    new ProcessService(petriNetResource, loggerService),
    new PublicProcessService(publicPetriNetResource, loggerService), redirectService);
};

const localAllowedNetsServiceFactory = (factory: AllowedNetsServiceFactory, route: ActivatedRoute) => {
  const array = [];
  if (route.snapshot.paramMap.get('petriNetId') !== null) {
    array.push(route.snapshot.paramMap.get('petriNetId'));
  }
  return factory.createFromArray(array);
};

const caseResourceServiceFactory = (userService: UserService, sessionService: SessionService, authService: AuthenticationService,
                                    router: Router, publicResolverService: PublicUrlResolverService,
                                    provider: ResourceProvider, config: ConfigurationService, redirectService: RedirectService) => {
  return publicFactoryResolver(userService, sessionService, authService, router, publicResolverService,
    new CaseResourceService(provider, config),
    new PublicCaseResourceService(provider, config), redirectService);
};

@Component({
  selector: 'app-public-single-task-view',
  templateUrl: './public-single-task-view.component.html',
  styleUrls: ['./public-single-task-view.component.scss'],
  providers: [
    TaskViewService,
    PublicTaskLoadingService,
    SearchService,
    RedirectService,
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
      deps: [Router, ActivatedRoute, ProcessService, CaseResourceService, SnackBarService, TranslateService, PublicTaskLoadingService, RedirectService],
    },
    {
      provide: AllowedNetsService,
      useFactory: localAllowedNetsServiceFactory,
      deps: [AllowedNetsServiceFactory, ActivatedRoute],
    },
    {provide: NAE_VIEW_ID_SEGMENT, useValue: 'publicSingleTaskView'},
    {provide: AllowedNetsServiceFactory, useClass: AllowedNetsServiceFactory},
    ViewIdService,
    {provide: TaskContentService, useClass: SingleTaskContentService},
    TaskDataService,
    FinishTaskService,
    TaskRequestStateService,
    TaskEventService,
    {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
    {provide: AllowedNetsServiceFactory, useClass: AllowedNetsServiceFactory},
    AsyncPipe,
  ],
})
export class PublicSingleTaskViewComponent extends AbstractSingleTaskViewComponent implements OnInit, AfterViewInit {

  @ViewChild('header') public taskHeaderComponent: HeaderComponent;
  public enablePageHeader = false;
  public enablePageFooter = false;
  public enableFinishButton = true;

  hidden: boolean;

  constructor(taskViewService: TaskViewService, publicTaskLoadingService: PublicTaskLoadingService,
              activatedRoute: ActivatedRoute, config: ConfigurationService, protected _router: Router,
              @Inject(NAE_BASE_FILTER) baseFilter: BaseFilter) {
    super(taskViewService, activatedRoute, baseFilter);
    this.hidden = true;
    this.loading$ = combineLatest([taskViewService.loading$, publicTaskLoadingService.loading$]).pipe(
      map(sources => {
        return sources[0] || sources[1];
      }),
    );
    const view = config.getViewByPath('public-view-single-task');
    this.enablePageHeader = view.layout.params.enableHeader;
    this.enablePageFooter = view.layout.params.enableFooter;
    this.enableFinishButton = view.layout.params.enableFinishButton;
  }

  ngOnInit(): void {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngAfterViewInit(): void {
    this.initializeHeader(this.taskHeaderComponent);

    const enableHeader = this._activatedRoute.snapshot.queryParams['header'];
    const enableFooter = this._activatedRoute.snapshot.queryParams['footer'];
    const enableFinishBtn = this._activatedRoute.snapshot.queryParams['finishBtn'];

    this.enablePageHeader = enableHeader === true || enableHeader === 'true';
    this.enablePageFooter = enableFooter === true || enableFooter === 'true';
    this.enableFinishButton = !(enableFinishBtn === false || enableFinishBtn === 'false');
  }

  logEvent(event: TaskEventNotification) {
    console.log(event);
  }

  newCase() {}

}
