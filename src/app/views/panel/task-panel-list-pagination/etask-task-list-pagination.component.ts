import {Component, Inject, Optional} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  AbstractTaskListPaginationComponent,
  InjectedTabData,
  LoggerService,
  NAE_TAB_DATA,
  TaskViewService,
} from '@netgrif/components-core';

@Component({
  selector: 'app-etask-task-list-pagination',
  templateUrl: './etask-task-list-pagination.component.html',
  styleUrls: ['./etask-task-list-pagination.component.scss'],
})
export class EtaskTaskListPaginationComponent extends AbstractTaskListPaginationComponent {
  constructor(protected _taskViewService: TaskViewService,
              protected _log: LoggerService,
              @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
              protected route?: ActivatedRoute) {
    super(_taskViewService, _log, injectedTabData, route);
    this.pageSize = 200;
    this.pageIndex = 0;
    this.pageSizeOptions = [20, 50, 100, 200];
  }
}
