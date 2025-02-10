import {CurrencyPipe} from '@angular/common';
import {Component, Inject, Injector, Optional} from '@angular/core';
import {TaskPanelComponent} from '@netgrif/components';
import {
  AssignPolicyService,
  AssignTaskService,
  BOOLEAN_VALUE_LABEL_ENABLED,
  CallChainService,
  CancelTaskService,
  ChangedFieldsService,
  DataFocusPolicyService,
  DelegateTaskService,
  DisableButtonFuntions,
  FinishPolicyService,
  FinishTaskService,
  InjectedTabData,
  LoggerService,
  NAE_TAB_DATA,
  NAE_TASK_OPERATIONS,
  NAE_TASK_PANEL_DISABLE_BUTTON_FUNCTIONS,
  OverflowService,
  PaperViewService,
  PermissionService,
  SubjectTaskOperations,
  TaskContentService,
  TaskDataService,
  TaskEventService,
  TaskRequestStateService,
  TaskViewService,
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-etask-task-panel',
  templateUrl: './etask-task-panel.component.html',
  styleUrls: ['./etask-task-panel.component.scss'],
  providers: [
    TaskDataService,
    TaskEventService,
    AssignTaskService,
    DelegateTaskService,
    CancelTaskService,
    FinishTaskService,
    TaskRequestStateService,
    DataFocusPolicyService,
    AssignPolicyService,
    FinishPolicyService,
    ChangedFieldsService,
    {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
  ],
})
export class EtaskTaskPanelComponent extends TaskPanelComponent {

  constructor(taskContentService: TaskContentService,
              log: LoggerService,
              taskViewService: TaskViewService,
              paperView: PaperViewService,
              taskEventService: TaskEventService,
              assignTaskService: AssignTaskService,
              delegateTaskService: DelegateTaskService,
              cancelTaskService: CancelTaskService,
              finishTaskService: FinishTaskService,
              taskState: TaskRequestStateService,
              taskDataService: TaskDataService,
              assignPolicyService: AssignPolicyService,
              finishPolicyService: FinishPolicyService,
              callChain: CallChainService,
              translate: TranslateService,
              @Inject(NAE_TASK_OPERATIONS) taskOperations: SubjectTaskOperations,
              @Optional() @Inject(NAE_TASK_PANEL_DISABLE_BUTTON_FUNCTIONS) disableFunctions: DisableButtonFuntions,
              @Optional() @Inject(BOOLEAN_VALUE_LABEL_ENABLED) isEnabled: boolean,
              parentInjector: Injector,
              currencyPipe: CurrencyPipe,
              changedFieldsService: ChangedFieldsService,
              permissionService: PermissionService,
              @Optional() overflowService: OverflowService,
              @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData) {
    super(taskContentService, log, taskViewService, paperView, taskEventService, assignTaskService, delegateTaskService, cancelTaskService, finishTaskService,
      taskState, taskDataService, assignPolicyService, finishPolicyService, callChain, translate, taskOperations, disableFunctions, isEnabled, parentInjector, currencyPipe,
      changedFieldsService, permissionService, overflowService, false, injectedTabData);
  }
}
