import { TestBed } from '@angular/core/testing';

import { EtaskUriService } from './etask-uri.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  AuthenticationModule,
  CaseResourceService,
  ConfigurationService,
  MockUserService,
  UserService
} from '@netgrif/components-core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockCaseResourceService } from './mock-case-resource.service';
import { TestLoggingConfigurationService } from './test-logging-config';
import { MockUriResourceService } from './mock-uri-resource.service';
import {EtaskUriResourceService} from "./etask-uri-resource.service";

describe('ETaskUriService', () => {
  let service: EtaskUriService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        AuthenticationModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {provide: ConfigurationService, useClass: TestLoggingConfigurationService},
        {provide: EtaskUriResourceService, useClass: MockUriResourceService},
        {provide: CaseResourceService, useClass: MockCaseResourceService},
        {provide: UserService, useClass: MockUserService},
      ],
    });
    service = TestBed.inject(EtaskUriService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get root node', () => {
    const root = service.root;
    expect(root.id).toEqual('root');
    expect(service.isRoot(root)).toBeTruthy();
    expect(service.activeNode).toEqual(root);
});

it('should set and reset activeNode', done => {
    service.getNodeByPath(MockUriResourceService.TEST1_PATH).subscribe(node => {
        service.activeNode = node;
        expect(service.activeNode).not.toEqual(service.root);
        service.reset();
        expect(service.activeNode).toEqual(service.root);
        done();
    });
});

it('should get node by path', done => {
    service.getNodeByPath(MockUriResourceService.TEST1_PATH).subscribe(res => {
        expect(res.uriPath).toEqual(MockUriResourceService.TEST1_PATH);
        expect(res.id).toEqual(MockUriResourceService.TEST1_ID);
        done();
    });
});

it('should get child nodes', done => {
    service.getChildNodes(service.root).subscribe(res => {
        expect(res.length).toEqual(2);
        res.forEach(r => {
            expect(r.id).toContain('test');
            expect(r.parentId).toEqual('root');
        });
        done();
    });
});

it('should get cases of node', done => {
    service.getCasesOfNode().subscribe(page => {
        expect(page.content.length).toEqual(1);
    });
    done();
});

it('should get siblings of a node', done => {
    service.getNodeByPath(MockUriResourceService.TEST1_PATH).subscribe(node => {
        expect(node.id).toEqual(MockUriResourceService.TEST1_ID);
        service.getSiblingsOfNode(node).subscribe(siblings => {
            expect(siblings.find(n => n.id === MockUriResourceService.TEST2_ID)).not.toBeUndefined();
            done();
        });
    });
});

it('should get nodes by level', done => {
    service.getNodesOnLevel(1).subscribe(res => {
        expect(res.length).toEqual(2);
        done();
    });
});

it('it should return path of a node\'s parent', done => {
    service.getNodeByPath(MockUriResourceService.TEST1_PATH).subscribe(node => {
        const parentPath = service.resolveParentPath(node);
        expect(parentPath).toEqual('root');
        done();
    });
});

it('should get parts of path', done => {
    service.getNodeByPath(MockUriResourceService.TEST1_PATH).subscribe(node => {
        const path = service.splitNodePath(node);
        expect(path.length).toEqual(1);
        expect(path[0]).toEqual(MockUriResourceService.TEST1_ID);
        done();
    });
});

});
