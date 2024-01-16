import { Injectable } from '@angular/core';
import { ConfigurationService, ResourceProvider, UriNodeResource, UriResourceService } from '@netgrif/components-core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EtaskUriResourceService extends UriResourceService {

  constructor(provider: ResourceProvider, configService: ConfigurationService) {
    super(provider, configService);
    // readonly hack
    (this as any)['_SERVER_URL'] = this.getResourceAddress('uri');
  }

  public getNodesCount(data: object): Observable<Counter> {
    return this._resourceProvider.post$('v2/uri/count', this.SERVER_URL, data).pipe(
      map(r => this.changeType(r, 'uriNode')));
  }

  public getRoot(): Observable<ETaskUriNodeResource> {
    return this._resourceProvider.get$('v2/uri/root', this.SERVER_URL).pipe(
      map(r => this.changeType(r, 'uriNode')));
  }

  public getByLevel(level: number): Observable<Array<ETaskUriNodeResource>> {
    return this._resourceProvider.get$('v2/uri/level/' + level, this.SERVER_URL).pipe(
      map(r => this.changeType(r, 'uriNodes')));
  }

  public getNodesByParent(parentId: string): Observable<Array<ETaskUriNodeResource>> {
    return this._resourceProvider.get$('v2/uri/parent/' + parentId, this.SERVER_URL).pipe(
      map(r => this.changeType(r, 'uriNodes')));
  }

  public getNodeByUri(uriPath: string): Observable<ETaskUriNodeResource> {
    return this._resourceProvider.get$('v2/uri/' + btoa(uriPath), this.SERVER_URL).pipe(
      map(r => this.changeType(r, 'uriNode')));
  }
}

export declare interface Counter {
  counts: Map<string, number>;
}

export declare interface ETaskUriNodeResource extends UriNodeResource {
  roleIds?: Array<string>;
  menuItemIdentifiers?: Array<string>;
  icon: string;
  section: string;
  iconSvg: boolean;
  hidden: boolean;
}

