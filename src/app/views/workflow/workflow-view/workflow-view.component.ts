import {Component} from '@angular/core';
import {ImportNetComponent} from '@netgrif/components';
import {
  AbstractWorkflowViewComponent,
  LoggerService,
  ProcessService,
  SideMenuService,
  WorkflowViewService,
} from '@netgrif/components-core';


@Component({
  selector: 'app-workflow-view',
  templateUrl: './workflow-view.component.html',
  styleUrls: ['./workflow-view.component.scss'],
  providers: [WorkflowViewService],

})
export class WorkflowViewComponent extends AbstractWorkflowViewComponent {
  constructor(protected _sideMenuService: SideMenuService,
              protected _workflowViewService: WorkflowViewService,
              protected _log: LoggerService,
              protected _processService: ProcessService) {
    super(_sideMenuService, _workflowViewService, _log, _processService);
  }

  public importNet() {
    this.importSidemenuNet(ImportNetComponent);
  }
}
