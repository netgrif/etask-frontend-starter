import { Injectable } from '@angular/core';
import { ConfigurationService, ResourceProvider, UriContentType } from '@netgrif/components-core';
import { Observable, of } from 'rxjs';
import { Counter, ETaskUriNodeResource, EtaskUriResourceService } from './etask-uri-resource.service';

@Injectable()
export class MockUriResourceService extends EtaskUriResourceService {

    static TEST1_ID = 'test1';
    static TEST1_PATH = 'root/test1';
    static TEST2_ID = 'test2';
    static TEST2_PATH = 'root/test2';

    private _root: ETaskUriNodeResource = {
        id: 'root',
        uriPath: 'root',
        name: 'root',
        parentId: null,
        parent: undefined,
        childrenId: new Set<string>([MockUriResourceService.TEST1_ID, MockUriResourceService.TEST2_ID]),
        children: undefined,
        level: 0,
        contentTypes: undefined,
        icon: "add",
        section: "settings",
        iconSvg: false,
        hidden: false,
    } as ETaskUriNodeResource;
    private _test1Node: ETaskUriNodeResource = {
        id: MockUriResourceService.TEST1_ID,
        uriPath: MockUriResourceService.TEST1_PATH,
        name: MockUriResourceService.TEST1_ID,
        parentId: 'root',
        parent: this._root,
        childrenId: undefined,
        children: undefined,
        level: 1,
        contentTypes: new Set<UriContentType>([UriContentType.PROCESS]),
        icon: "add",
        section: "settings",
        iconSvg: false,
        hidden: false,
    } as ETaskUriNodeResource;
    private _test2Node: ETaskUriNodeResource = {
        id: MockUriResourceService.TEST2_ID,
        uriPath: MockUriResourceService.TEST2_PATH,
        name: MockUriResourceService.TEST2_ID,
        parentId: 'root',
        parent: this._root,
        childrenId: undefined,
        children: undefined,
        level: 1,
        contentTypes: new Set<UriContentType>([UriContentType.CASE]),
        icon: "add",
        section: "settings",
        iconSvg: false,
        hidden: false,
    } as ETaskUriNodeResource;

    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super(provider, configService);
    }

    public getNodesCount(data: object): Observable<Counter> {
        return of({ counts: new Map<string, number>([["root", 1]]) } as Counter);
    }

    getRoot(): Observable<ETaskUriNodeResource> {
        return of(this._root);
    }

    getByLevel(level: number): Observable<Array<ETaskUriNodeResource>> {
        if (level === 1) return of([this._test1Node, this._test2Node]);
        return of([this._root]);
    }

    getNodesByParent(parentId: string): Observable<Array<ETaskUriNodeResource>> {
        if (parentId === 'root') return of([this._test1Node, this._test2Node]);
        return of([this._root]);
    }

    getNodeByUri(uriPath: string): Observable<ETaskUriNodeResource> {
        switch (uriPath) {
            case MockUriResourceService.TEST1_PATH:
                return of<ETaskUriNodeResource>(this._test1Node);
            case MockUriResourceService.TEST2_PATH:
                return of<ETaskUriNodeResource>(this._test2Node);
            default:
                return of(this._root);
        }
    }
}