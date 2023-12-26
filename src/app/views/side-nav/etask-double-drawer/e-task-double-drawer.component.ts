import {animate, state, style, transition, trigger} from '@angular/animations';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationDoubleDrawerComponent} from '@netgrif/components';
import {
  AccessService,
  ConfigurationService,
  DynamicNavigationRouteProviderService,
  FILTER_IDENTIFIERS,
  ImpersonationService,
  ImpersonationUserSelectService,
  LanguageService,
  LoggerService,
  UriNodeResource,
  UriService,
  UserService,
  ViewNavigationItem,
} from '@netgrif/components-core';
import {forkJoin, of} from 'rxjs';
import {map} from 'rxjs/operators';
import icons from '../../../../assets/uriNodeIcons.json';
import {ETaskUriNodeResource} from '../../dashboard/service/etask-uri-resource.service';
import {EtaskUriService} from '../../dashboard/service/etask-uri.service';

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

  static readonly SETTINGS_SECTION = 'settings';
  static readonly ARCHIVE_SECTION = 'archive';
  public isSectionOpen: {
    folders: boolean;
    views: boolean;
    settings: boolean;
    archive: boolean;
  };
  public settingsNodes: Array<UriNodeResource>;
  public settingsViews: Array<ViewNavigationItem>;

  public archiveNodes: Array<UriNodeResource>;
  public archiveViews: Array<ViewNavigationItem>;

  constructor(router: Router,
              activatedRoute: ActivatedRoute,
              breakpoint: BreakpointObserver,
              languageService: LanguageService,
              userService: UserService,
              accessService: AccessService,
              log: LoggerService,
              config: ConfigurationService,
              uriService: UriService,
              impersonationUserSelect: ImpersonationUserSelectService,
              impersonation: ImpersonationService,
              private _customUri: EtaskUriService,
              dynamicRouteProviderService: DynamicNavigationRouteProviderService) {
    super(router, activatedRoute, breakpoint, languageService, userService, accessService, log, config, uriService,
      impersonationUserSelect, impersonation, dynamicRouteProviderService);
    this._impersonation.impersonating$.subscribe(() => {
      this._router.navigate(['dashboard']);
    });
    this.isSectionOpen.settings = false;
    this.isSectionOpen.archive = false;
    this.settingsViews = [];
    this.settingsNodes = [];
    this.archiveViews = [];
    this.archiveNodes = [];
  }

  protected loadLeftSide() {
    if (this._uriService.isRoot(this.currentNode)) {
      this.leftNodes = [];
      return;
    }
    this.leftLoading$.on();
    this._leftNodesSubscription = this._uriService.getSiblingsOfNode(this.currentNode).subscribe(nodes => {
      const allNodes = this._customUri.filterUriNodesByRoles(nodes instanceof Array ? nodes : []);
      this.leftNodes = [];
      allNodes.forEach(node => {
        if (node.hidden) return;
        if (!node.section) {
          this.leftNodes.push(node);
        }
      });

      this.leftNodes.sort((a, b) => this.compareStrings(a.name, b.name));
      this.leftLoading$.off();
    }, error => {
      this._log.error(error);
      this.leftNodes = [];
      this.leftLoading$.off();
    });
  }

  protected loadRightSide() {
    this.rightLoading$.on();
    this._uriService.getCasesOfNode(this.currentNode, FILTER_IDENTIFIERS, 0, 1).subscribe(page => {
      this._log.debug('Number of filters for uri ' + this.currentNode.uriPath + ': ' + page?.pagination?.totalElements);
      forkJoin({
        folders: this._uriService.getChildNodes(this.currentNode),
        filters: page?.pagination?.totalElements === 0 ? of([]) : this._uriService.getCasesOfNode(this.currentNode, FILTER_IDENTIFIERS, 0, page.pagination.totalElements).pipe(
          map(p => p.content),
        ),
      }).subscribe(result => {
        const allNodes = this._customUri
          .filterUriNodesByRoles(result.folders instanceof Array ? result.folders : [])
          .sort((a, b) => this.compareStrings(a.name, b.name));
        this.rightNodes = [];
        this.views = [];
        this.settingsNodes = [];
        this.settingsViews = [];
        this.archiveNodes = [];
        this.archiveViews = [];
        this.isSectionOpen.views = true;
        this.isSectionOpen.folders = true;
        allNodes.forEach(node => {
          if (node.hidden) return;
          if (node.section === ETaskDoubleDrawerComponent.SETTINGS_SECTION) {
            this.settingsNodes.push(node);
          } else if (node.section === ETaskDoubleDrawerComponent.ARCHIVE_SECTION) {
            this.archiveNodes.push(node);
          } else {
            this.rightNodes.push(node);
          }
        });
        const allViewsFilters = (result.filters instanceof Array ? result.filters : []);
        allViewsFilters.forEach(vf => {
          const convertedViewItem = this.resolveFilterCaseToViewNavigationItem(vf);
          if (!convertedViewItem) return;
          const sectionImmediate = vf.immediateData.find(f => f.stringId === 'custom_drawer_section')?.value;
          if (!sectionImmediate) {
            this.views.push(convertedViewItem);
          } else if (sectionImmediate === ETaskDoubleDrawerComponent.SETTINGS_SECTION) {
            this.settingsViews.push(convertedViewItem);
          } else {
            this.archiveViews.push(convertedViewItem);
          }
        });
        if (!!this._childCustomViews[this.currentNode.uriPath]) {
          this.views.push(...Object.values(this._childCustomViews[this.currentNode.uriPath]));
        }
        // @ts-ignore
        this.views.sort((a, b) => this.compareStrings(a?.navigation?.title, b?.navigation?.title));
        this.rightLoading$.off();
      }, error => {
        this._log.error(error);
        this.rightNodes = [];
        this.views = [];
        this.rightLoading$.off();
      });
    }, error => {
      this._log.error(error);
      this.rightNodes = [];
      this.views = [];
      this.rightLoading$.off();
    });
  }

  public isSettingsEmpty(): boolean {
    return !this.settingsNodes && !this.settingsViews;
  }

  public isArchiveEmpty(): boolean {
    return !this.archiveNodes && !this.archiveViews;
  }

  public getLeftNodeIcon(node: UriNodeResource): string {
    const cNode = node as ETaskUriNodeResource;
    if (cNode.icon) {
      return cNode.icon;
    }
    if (icons[node.name]) {
      return icons[node.name];
    }
    return node.id === this.currentNode.id ? this.openedFolderIcon : this.folderIcon;
  }

  public getRightFolderIcon(node: UriNodeResource): string {
    const cNode = node as ETaskUriNodeResource;
    if (cNode.icon) {
      return cNode.icon;
    }
    if (icons[node.name]) {
      return icons[node.name];
    }
    return this.folderIcon;
  }

  public logout(): void {
    this._userService.logout();
  }

  public isRoot(): boolean {
    return this.currentNode.name === 'root';
  }
}
