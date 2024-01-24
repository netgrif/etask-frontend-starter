import {Injectable, Type} from '@angular/core';
import {DefaultSimpleTaskViewComponent, DefaultTabViewComponent} from '@netgrif/components';
import {
  DataGroup,
  extractFilterFromData,
  FilterType,
  GroupNavigationComponentResolverService,
  LoggerService,
  TaskResourceService,
} from '@netgrif/components-core';

@Injectable()
export class EtaskGroupNavigationComponentResolverService extends GroupNavigationComponentResolverService {

  constructor(taskResourceService: TaskResourceService, log: LoggerService) {
    super(taskResourceService, log);
  }

  public resolveViewComponent(navigationItemTaskData: Array<DataGroup>): Type<any> {
    const filter = extractFilterFromData(navigationItemTaskData);

    if (filter === undefined) {
      throw new Error('Provided navigation item task data does not contain a filter field');
    }

    switch (filter.type) {
      case FilterType.CASE:
        return DefaultTabViewComponent;
      case FilterType.TASK:
        return DefaultSimpleTaskViewComponent;
      default:
        throw new Error(`Cannot resolve group navigation component from '${filter.type}' filter type`);
    }
  }
}
