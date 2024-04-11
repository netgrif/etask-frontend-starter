import {animate, state, style, transition, trigger} from '@angular/animations';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationDoubleDrawerComponent} from '@netgrif/components';
import {
  AccessService,
  CaseResourceService,
  ConfigurationService,
  DynamicNavigationRouteProviderService,
  ImpersonationService,
  ImpersonationUserSelectService,
  LanguageService,
  LoadingEmitter,
  LoggerService,
  MenuOrder,
  NavigationItem,
  UriNodeResource,
  UriService,
  UserService,
} from '@netgrif/components-core';
import {EtaskUriService} from '../../dashboard/service/etask-uri.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-e-task-double-drawer',
  templateUrl: './e-task-double-drawer.component.html',
  styleUrls: ['./e-task-double-drawer.component.scss'],
  animations: [
    trigger('sectionExpansion', [
      state('expanded, void', style({
        height: '*',
        visibility: 'visible',
      })),
      state('collapsed', style({
        height: '0px',
        visibility: 'hidden',
      })),
      transition('expanded <=> collapsed, void => expanded', [
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)'),
      ]),
    ]),
    trigger('indicatorRotate', [
      state('expanded, void', style({
        transform: 'rotate(180deg)',
      })),
      state('collapsed', style({
        transform: 'rotate(0deg)',
      })),
      transition('expanded <=> collapsed, void => expanded', [
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)'),
      ]),
    ]),
  ],
})
export class ETaskDoubleDrawerComponent extends NavigationDoubleDrawerComponent {

  constructor(router: Router,
              activatedRoute: ActivatedRoute,
              breakpoint: BreakpointObserver,
              languageService: LanguageService,
              translateService: TranslateService,
              userService: UserService,
              accessService: AccessService,
              log: LoggerService,
              config: ConfigurationService,
              uriService: UriService,
              caseResourceService: CaseResourceService,
              impersonationUserSelect: ImpersonationUserSelectService,
              impersonation: ImpersonationService,
              private _customUri: EtaskUriService,
              dynamicRouteProviderService: DynamicNavigationRouteProviderService) {
    super(router, activatedRoute, breakpoint, languageService, translateService, userService, accessService, log, config, uriService,
      caseResourceService, impersonationUserSelect, impersonation, dynamicRouteProviderService);
    this._impersonation.impersonating$.subscribe(() => {
      this._router.navigate(['dashboard']);
    });
    this.leftItems = new Array<NavigationItem>();
        this.rightItems = new Array<NavigationItem>();
        this.leftLoading$ = new LoadingEmitter();
        this.rightLoading$ = new LoadingEmitter();
        this.nodeLoading$ = new LoadingEmitter();
        this.itemsOrder = MenuOrder.Ascending;
        this.hiddenCustomItems = [];
        this.moreItems = new Array<NavigationItem>();
        this._childCustomViews = {};
  }
}
