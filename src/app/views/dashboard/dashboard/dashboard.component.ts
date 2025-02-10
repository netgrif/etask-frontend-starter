import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AccessService,
  Case,
  CaseResourceService,
  CaseSearchRequestBody,
  DynamicNavigationRouteProviderService,
  FilterExtractionService,
  GroupNavigationConstants,
  LoadingEmitter,
  MENU_IDENTIFIERS,
  NavigationItem,
  Page,
  PaginationParams,
  PetriNetSearchRequest,
  RoleAccess,
  SETTINGS_TRANSITION_ID,
  SimpleFilter,
  TaskResourceService,
  UriService,
  User, UserService,
} from '@netgrif/components-core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import custom_views from '../../../../assets/custom_views.json';
import icons from '../../../../assets/uriNodeIcons.json';
import { ETaskUriNodeResource } from '../service/etask-uri-resource.service';
import { EtaskUriService } from '../service/etask-uri.service';
import { I18nFieldValue } from '@netgrif/components-core/lib/data-fields/i18n-field/models/i18n-field-value';
import { TranslateService } from '@ngx-translate/core';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public nodes: Array<ETaskUriNodeResource> = [];

  public customViews: Array<NavigationItem> = [];
  protected _counters: Map<string, number> = new Map<string, number>();

  private _sub: Subscription;
  private _loading: LoadingEmitter;

  private filterIcon: string = 'filter_alt';

  constructor(
    private _user: UserService,
    private _uri: EtaskUriService,
    private _taskResource: TaskResourceService,
    private _router: Router,
    private _filterExtraction: FilterExtractionService,
    private _dynamicRoutingService: DynamicNavigationRouteProviderService,
    private _accessService: AccessService,
    protected _translateService: TranslateService,
    private _caseResourceService: CaseResourceService,
  ) {
    this._loading = new LoadingEmitter();
  }

  ngOnInit(): void {
    this._sub = this._uri.rootLoaded$.subscribe(() => {
      if (this._uri.root) {
        this._uri.root.children.forEach(c => this.nodes.push(c as ETaskUriNodeResource));
        this.nodes = this._uri.filterCustomUriNodesByRoles(this.nodes).filter(n => !n.section);
        this.nodes.sort((a, b) => a.name.localeCompare(b.name));
        this._loading.on();
        this._uri.getCountForNodes(this.nodes).subscribe(() => {
          this._loading.off();
        });

        this._uri.getCasesOfNode(this._uri.root, MENU_IDENTIFIERS).pipe(
          map(cases => {
            const filteredViews = cases
              .content.filter(it => custom_views.includes(it.immediateData.find(f => f.stringId === 'menu_item_identifier')?.value))
              .sort((a, b) => this.getViewOrder(a) - this.getViewOrder(b));
            return filteredViews.map(it => this.resolveFilterCaseToNavigationItem(it)).filter(it => !!it);
          }),
        ).subscribe(views => {
          this.customViews = views;
          // TODO not counting custom views
          this.getCountForViews(this.customViews);
        });
      }
    });
  }

  /* Uri node */
  public count(name: string): number {
    return this._uri.getCachedNodeCount(name);
  }

  /* from AbstractNavigationDoubleDrawerComponent */
  protected extractChildCaseIds(item: Case): string[] {
    return item.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_CHILD_ITEM_IDS)?.value
  }

  /* from AbstractNavigationDoubleDrawerComponent */
  protected getItemCasesByIds(caseIds: string[], pageNumber: number, pageSize: string | number): Observable<Page<Case>> {
    const searchBody: CaseSearchRequestBody = {
      stringId: caseIds,
      process: MENU_IDENTIFIERS.map(id => ({ identifier: id } as PetriNetSearchRequest))
    };

    let httpParams = new HttpParams()
      .set(PaginationParams.PAGE_SIZE, pageSize)
      .set(PaginationParams.PAGE_NUMBER, pageNumber);
    return this._caseResourceService.searchCases(SimpleFilter.fromCaseQuery(searchBody), httpParams);
  }

  public openNode(node: ETaskUriNodeResource) {
    this._uri.activeNode = node;
    this._uri.getItemCaseByNodePath(node).subscribe(cases => {
      let nodeItemCase = cases.content.pop();
      let childCaseIds = this.extractChildCaseIds(nodeItemCase);
      let childCases$ = this.getItemCasesByIds(childCaseIds, 0, childCaseIds.length).pipe(map(p => p.content));

      childCases$.subscribe(result => {
        result = (result as Case[])
        result.map(folder => this.resolveFilterCaseToNavigationItem(folder)).filter(i => !!i);
        let firstCase = result[0]
        let taskDefault = firstCase.tasks.find(taskPair => taskPair.transition == SETTINGS_TRANSITION_ID).task;
        this._router.navigate(['portal', 'filter', taskDefault]);
      });
    });

  }

  public getNodeIcon(node: ETaskUriNodeResource) {
    if (icons[node.name]) {
      return icons[node.name];
    }
    return 'folder';
  }

  /* custom views */
  public countView(view: NavigationItem) {
    return this.isCountLoaded(view) ? this._counters.get(view.id) : 0;
  }

  public isCountLoaded(view: NavigationItem) {
    return this._counters.has(view.id);
  }

  public areCountersLoaded(): boolean {
    return !this._loading.getValue();
  }

  // TODO rozdrbane
  public getCountForViews(customViews: Array<NavigationItem>) {
    if (!customViews) {
      return;
    }
    customViews.forEach(view => {
      const taskId = view.resource.tasks.find(taskPair => taskPair.transition === SETTINGS_TRANSITION_ID).task;
      this._taskResource.getData(taskId).subscribe(taskData => {
        const filter = this._filterExtraction.extractCompleteFilterFromData(taskData);
        this._taskResource.count(filter).subscribe(count => {
          this._counters.set(view.id, count.count);
        });
      });
    });
  }

  public openView(view: NavigationItem) {
    this._uri.activeNode = this._uri.root;
    this._router.navigate([view.routing.path]);
  }

  /* user session */
  public logout(): void {
    this._user.logout().subscribe(() => {
      this._router.navigate(['login']);
    });
  }

  public get loggedUser(): User {
    return this._user.user;
  }

  public isImpersonating(): boolean {
    return this.loggedUser.isImpersonating();
  }

  /* util */
  private getViewOrder(aCase: Case) {
    return custom_views.indexOf(aCase.immediateData.find(f => f.stringId === 'menu_item_identifier')?.value);
  }

  /* from AbstractNavigationDoubleDrawerComponent */
  protected representsRootNode(item: Case): boolean {
    return item.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH).value === "/"
  }

  /* from AbstractNavigationDoubleDrawerComponent */
  protected resolveFilterCaseToNavigationItem(itemCase: Case): NavigationItem | undefined {
    if (this.representsRootNode(itemCase)) {
      return
    }
    const item: NavigationItem = {
      access: {},
      navigation: {
        icon: itemCase.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_MENU_ICON)?.value || this.filterIcon,
        title: this.getTranslation(itemCase.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_MENU_NAME)?.value) || itemCase.title,
      },
      routing: {
        path: this.getItemRoutingPath(itemCase),
      },
      id: itemCase.stringId,
      resource: itemCase,
    };
    const resolvedRoles = this.resolveAccessRoles(itemCase, GroupNavigationConstants.ITEM_FIELD_ID_ALLOWED_ROLES);
    const resolvedBannedRoles = this.resolveAccessRoles(itemCase, GroupNavigationConstants.ITEM_FIELD_ID_BANNED_ROLES);
    if (!!resolvedRoles) item.access['role'] = resolvedRoles;
    if (!!resolvedBannedRoles) item.access['bannedRole'] = resolvedBannedRoles;
    if (!this._accessService.canAccessView(item, item.routingPath)) return;
    return item;
  }

  /* from AbstractNavigationDoubleDrawerComponent */
  protected getTranslation(value: I18nFieldValue): string {
    const locale = this._translateService.currentLang.split('-')[0];
    return locale in value.translations ? value.translations[locale] : value.defaultValue;
  }

  /* from AbstractNavigationDoubleDrawerComponent */
  protected getItemRoutingPath(itemCase: Case) {
    const taskId = itemCase.tasks.find(taskPair => taskPair.transition === SETTINGS_TRANSITION_ID).task;
    const url = this._dynamicRoutingService.route;
    return `/${url}/${taskId}`;
  }

  /* from AbstractNavigationDoubleDrawerComponent */
  protected resolveAccessRoles(filter: Case, roleType: string): Array<RoleAccess> | undefined {
    const allowedRoles = filter.immediateData.find(f => f.stringId === roleType)?.options;
    if (!allowedRoles || Object.keys(allowedRoles).length === 0) return undefined;
    const roles = [];
    Object.keys(allowedRoles).forEach(combined => {
      const parts = combined.split(':');
      roles.push({
        processId: parts[1],
        roleId: parts[0],
      });
    });
    return roles;
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
