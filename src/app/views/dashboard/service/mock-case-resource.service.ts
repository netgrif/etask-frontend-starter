import {Injectable} from '@angular/core';
import { Case, CaseSearchRequestBody, Filter, Page, Params } from '@netgrif/components-core';
import {Observable, of} from 'rxjs';

@Injectable()
export class MockCaseResourceService {

    public searchCases(filter: Filter, params?: Params): Observable<Page<Case>> {
        if ((filter.getRequestBody() as CaseSearchRequestBody).uriNodeId) {
            return of({
                content: [
                    {
                        lastModified: [2022, 11, 28],
                        visualId: 'TST-123548',
                        petriNetObjectId: undefined,
                        processIdentifier: 'test-process',
                        title: 'test case',
                        color: 'black',
                        creationDate: [2022, 11, 28],
                        immediateData: [{
                            stringId: 'objectid',
                            type: 'text',
                        }],
                        author: {
                            email: 'test@example.com',
                            fullName: 'Test',
                        },
                        resetArcTokens: {},
                        stringId: 'objectid',
                        petriNetId: 'objectid',
                        permissions: {
                            'objectid': {},
                        },
                    },
                ],
                pagination: {
                    totalElements: 1,
                    number: 0,
                    size: 1,
                    totalPages: 1,
                },
            });
        }
        return of(undefined);
    }
}
