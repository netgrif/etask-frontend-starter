import {Injectable} from '@angular/core';
import {
  ActiveGroupService,
  CaseResourceService,
  LoggerService,
  UriNodeResource,
  UriService,
  UserService,
} from '@netgrif/components-core';
import {Observable, Subject} from 'rxjs';
import {ETaskUriNodeResource, EtaskUriResourceService} from './etask-uri-resource.service';

@Injectable({
  providedIn: 'root',
})
export class EtaskUriService extends UriService {

  protected _counters: Map<string, number>;

  constructor(protected userService: UserService,
              _logger: LoggerService,
              _resourceService: EtaskUriResourceService,
              _caseResourceService: CaseResourceService,
              _activeGroupService: ActiveGroupService) {
    // TODO load page size from injection token
    super(_logger, _resourceService, _caseResourceService, _activeGroupService, 100);
    this._counters = new Map<string, number>();
  }

  public filterUriNodesByRoles(nodes: Array<UriNodeResource>) {
    return this.filterCustomUriNodesByRoles(nodes as Array<ETaskUriNodeResource>);
  }

  public filterCustomUriNodesByRoles(nodes: Array<ETaskUriNodeResource>) {
    return nodes.filter(node => {
      if (node.roleIds === undefined) {
        return true;
      }
      return node.roleIds.some(roleId => this.userService.hasRoleById(roleId));
    });
  }

  public getCountForNodes(nodes: Array<UriNodeResource>): Observable<boolean> {
    if (!nodes) {
      return;
    }
    const stream$ = new Subject<boolean>();
    const menuItemIdentifiersBody = {};
    const legacyQueriesBody = {};
    nodes.forEach(node => {
      const menuItemIdentifiers = (node as ETaskUriNodeResource)?.menuItemIdentifiers;
      if (menuItemIdentifiers) {
        menuItemIdentifiersBody[node.uriPath] = menuItemIdentifiers;
      } else {
        legacyQueriesBody[node.name] = node.id;
      }
    });
    (this._resourceService as EtaskUriResourceService).getNodesCount({
      menuItemIdentifiersQueries: menuItemIdentifiersBody,
      legacyQueries: legacyQueriesBody,
    }).subscribe(count => {
      if (count && count.counts) {
        Object.keys(count.counts).forEach((counter) => {
          this._counters.set(counter, count.counts[counter] ? count.counts[counter] : 0);
        });
        stream$.next(true);
      } else {
        stream$.next(false);
      }
      stream$.complete();
    }, error => {
      this._logger.error(error);
      stream$.next(false);
      stream$.complete();
    });
    return stream$.asObservable();
  }

  public getCachedNodeCount(name: string): number {
    return this._counters.has(name) ? this._counters.get(name) : 0;
  }
}
