import {Injectable} from '@angular/core';
import {
  ConfigurationService,
  FieldConverterService,
  Filter,
  LoggerService,
  Page,
  Params,
  ResourceProvider,
  Task,
  TaskResourceService,
} from '@netgrif/components-core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ETaskTaskResourceService extends TaskResourceService {

  constructor(provider: ResourceProvider,
              configService: ConfigurationService,
              fieldConverter: FieldConverterService,
              logger: LoggerService) {
    super(provider, configService, fieldConverter, logger);
  }

  getTasks(filterParam: Filter, params?: Params): Observable<Page<Task>> {
    return super.searchTask(filterParam, params);
  }
}
