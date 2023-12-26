import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  AccessService,
  Case,
  DynamicNavigationRouteProviderService,
  FILTER_IDENTIFIERS,
  FILTER_VIEW_TASK_TRANSITION_ID,
  FilterExtractionService,
  LoadingEmitter,
  RoleAccess,
  TaskResourceService,
  User,
  UserService,
  ViewNavigationItem,
} from '@netgrif/components-core';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import custom_views from '../../../../assets/custom_views.json';
import icons from '../../../../assets/uriNodeIcons.json';
import {ETaskUriNodeResource} from '../service/etask-uri-resource.service';
import {EtaskUriService} from '../service/etask-uri.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public nodes: Array<ETaskUriNodeResource> = [];

  public customViews: Array<ViewNavigationItem> = [];
  protected _counters: Map<string, number> = new Map<string, number>();

  private _sub: Subscription;
  private _loading: LoadingEmitter;

  constructor(
    private _user: UserService,
    private _uri: EtaskUriService,
    private _taskResource: TaskResourceService,
    private _router: Router,
    private _filterExtraction: FilterExtractionService,
    private _dynamicRoutingService: DynamicNavigationRouteProviderService,
    private _accessService: AccessService,
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

        this._uri.getCasesOfNode(this._uri.root, FILTER_IDENTIFIERS).pipe(
          map(cases => {
            const filteredViews = cases
              .content.filter(it => custom_views.includes(it.immediateData.find(f => f.stringId === 'menu_item_identifier')?.value))
              .sort((a, b) => this.getViewOrder(a) - this.getViewOrder(b));
            return filteredViews.map(it => this.resolveFilterCaseToViewNavigationItem(it)).filter(it => !!it);
          }),
        ).subscribe(views => {
          this.customViews = views;
          this.getCountForViews(this.customViews);
        });
      }
    });
  }

  /* Uri node */
  public count(name: string): number {
    return this._uri.getCachedNodeCount(name);
  }

  public openNode(node: ETaskUriNodeResource) {
    this._uri.activeNode = node;
    this._router.navigate(['portal']);
  }

  public getNodeIcon(node: ETaskUriNodeResource) {
    if (icons[node.name]) {
      return icons[node.name];
    }
    return 'folder';
  }

  /* custom views */
  public countView(view: ViewNavigationItem) {
    return this.isCountLoaded(view) ? this._counters.get(view.id) : 0;
  }

  public isCountLoaded(view: ViewNavigationItem) {
    return this._counters.has(view.id);
  }

  public areCountersLoaded(): boolean {
    return !this._loading.getValue();
  }

  public getCountForViews(customViews: Array<ViewNavigationItem>) {
    if (!customViews) {
      return;
    }
    customViews.forEach(view => {
      const taskId = view.resource.tasks.find(taskPair => taskPair.transition === FILTER_VIEW_TASK_TRANSITION_ID).task;
      this._taskResource.getData(taskId).subscribe(taskData => {
        const filter = this._filterExtraction.extractCompleteFilterFromData(taskData);
        this._taskResource.count(filter).subscribe(count => {
          this._counters.set(view.id, count.count);
        });
      });
    });
  }

  public openView(view: ViewNavigationItem) {
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
  protected resolveFilterCaseToViewNavigationItem(filter: Case): ViewNavigationItem | undefined {
    const item: ViewNavigationItem = {
      access: {},
      navigation: {
        icon: filter.immediateData.find(f => f.stringId === 'icon_name')?.value,
        title: filter.immediateData.find(f => f.stringId === 'entry_name')?.value?.defaultValue || filter.title,
      },
      routing: {
        path: this.getFilterRoutingPath(filter),
      },
      id: filter.stringId,
      resource: filter,
    };
    const resolvedRoles = this.resolveAccessRoles(filter, 'allowed_roles');
    const resolvedBannedRoles = this.resolveAccessRoles(filter, 'banned_roles');
    if (!!resolvedRoles) item.access['role'] = resolvedRoles;
    if (!!resolvedBannedRoles) item.access['bannedRole'] = resolvedBannedRoles;
    if (!this._accessService.canAccessView(item, item.routingPath)) return;
    return item;
  }

  /* from AbstractNavigationDoubleDrawerComponent */
  protected getFilterRoutingPath(filterCase: Case) {
    const viewTaskId = filterCase.tasks.find(taskPair => taskPair.transition === FILTER_VIEW_TASK_TRANSITION_ID).task;
    const url = this._dynamicRoutingService.route;
    return `/${url}/${viewTaskId}`;
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
