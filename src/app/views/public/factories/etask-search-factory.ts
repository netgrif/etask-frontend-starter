import {ActivatedRoute, Router} from '@angular/router';
import {
  CaseResourceService,
  FilterType,
  getNetAndCreateCase,
  ProcessService,
  PublicTaskLoadingService,
  SimpleFilter,
  SnackBarService,
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

export const publicBaseFilterFactory = (router: Router, route: ActivatedRoute, process: ProcessService,
                                        caseResourceService: CaseResourceService, snackBarService: SnackBarService,
                                        translate: TranslateService, publicTaskLoadingService: PublicTaskLoadingService) => {
  if (route.snapshot.paramMap.get('caseId') === null && route.snapshot.paramMap.get('petriNetId') !== null) {
    getNetAndCreateCase(router, route, process, caseResourceService, snackBarService, translate, publicTaskLoadingService);
  } else if (route.snapshot.paramMap.get('caseId') !== null) {
    return {
      filter: new SimpleFilter('', FilterType.TASK, {case: {id: route.snapshot.paramMap.get('caseId')}}),
    };
  }
  return {
    filter: new SimpleFilter('', FilterType.TASK, {case: {id: 'No Case'}}),
  };
};
