import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {RoleAssignmentComponent} from '@netgrif/components';
import {ConfigurationService, LoggerService, ViewService} from '@netgrif/components-core';
import {DashboardComponent} from './views/dashboard/dashboard/dashboard.component';
import {LoginComponent} from './views/login/login.component';
import {PublicResolverComponent} from './views/public/public-resolver/public-resolver.component';
import {PublicSingleTaskViewComponent} from './views/public/public-single-task-view/public-single-task-view.component';
import {PublicTaskViewComponent} from './views/public/public-task-view/public-task-view.component';
import {PublicWorkflowViewComponent} from './views/public/public-workflow-view/public-workflow-view.component';
import {SideNavCasesCaseViewComponent} from './views/side-nav/cases/side-nav-cases-case-view.component';
import {EmptyViewComponent} from './views/side-nav/emptyView/empty-view.component';
import {SidenavComponent} from './views/side-nav/sidenav.component';
import {SideNavTasksTaskViewComponent} from './views/side-nav/tasks/side-nav-tasks-task-view.component';
import {WorkflowViewComponent} from './views/workflow/workflow-view/workflow-view.component';


@Injectable({
  providedIn: 'root',
})
export class EtaskFrontendViewService extends ViewService {
  constructor(configurationService: ConfigurationService, router: Router, loggerService: LoggerService) {
    // This class is managed by schematics. Avoid modifying it by hand.
    // If you want to add views to the application run the 'create-view' schematic.
    super([{id: 'RoleAssignmentComponent', class: RoleAssignmentComponent},
      {id: 'WorkflowViewComponent', class: WorkflowViewComponent},
      {id: 'EmptyViewComponent', class: EmptyViewComponent},
      {id: 'SideNavTasksTaskViewComponent', class: SideNavTasksTaskViewComponent},
      {id: 'SideNavCasesCaseViewComponent', class: SideNavCasesCaseViewComponent},
      {id: 'SidenavComponent', class: SidenavComponent},
      {id: 'LoginComponent', class: LoginComponent},
      {id: 'DashboardComponent', class: DashboardComponent},
      {id: 'PublicResolverComponent', class: PublicResolverComponent},
      {id: 'PublicTaskViewComponent', class: PublicTaskViewComponent},
      {id: 'PublicWorkflowViewComponent', class: PublicWorkflowViewComponent},
      {id: 'PublicSingleTaskViewComponent', class: PublicSingleTaskViewComponent},
    ], configurationService, router, loggerService);
  }
}
