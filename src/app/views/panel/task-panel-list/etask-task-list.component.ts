import {Component, Inject, Optional} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TaskListComponent} from '@netgrif/components';
import {InjectedTabData, LoggerService, NAE_TAB_DATA, TaskViewService} from '@netgrif/components-core';

@Component({
  selector: 'app-etask-task-list',
  templateUrl: './etask-task-list.component.html',
  styleUrls: ['./etask-task-list.component.scss'],
})
export class EtaskTaskListComponent extends TaskListComponent {
  constructor(_taskViewService: TaskViewService,
              _log: LoggerService,
              @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
              route?: ActivatedRoute) {
    super(_taskViewService, _log, injectedTabData, route);
  }
}
