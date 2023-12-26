import {Component, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DefaultTabbedCaseViewComponent, DefaultTabbedTaskViewComponent} from '@netgrif/components';
import {
  DataGroup,
  extractIconAndTitle,
  groupNavigationViewIdSegmentFactory,
  NAE_NAVIGATION_ITEM_TASK_DATA,
  NAE_VIEW_ID_SEGMENT,
  NewCaseCreationConfigurationData,
  TabContent,
  ViewIdService,
} from '@netgrif/components-core';


@Component({
  selector: 'app-etask-tab-view',
  templateUrl: './etask-tab-view.component.html',
  styleUrls: ['./etask-tab-view.component.scss'],
  providers: [
    ViewIdService,
    {provide: NAE_VIEW_ID_SEGMENT, useFactory: groupNavigationViewIdSegmentFactory, deps: [ActivatedRoute]},
  ],
})
export class EtaskTabViewComponent {


  tabs: Array<TabContent>;

  constructor(
    @Inject(NAE_NAVIGATION_ITEM_TASK_DATA) protected _navigationItemTaskData: Array<DataGroup>,
    @Inject(NAE_VIEW_ID_SEGMENT) protected _viewIdSegment: string) {
    const labelData = extractIconAndTitle(this._navigationItemTaskData);
    const createCaseButtonTitle: string = _navigationItemTaskData[0]?.fields
      .find(field => field.stringId === 'create_case_button_title')?.value;
    const createCaseButtonIcon: string = _navigationItemTaskData[0].fields
      .find(field => field.stringId === 'create_case_button_icon')?.value;
    const enableCaseTitle: boolean = _navigationItemTaskData[0].fields
      .find(field => field.stringId === 'enable_case_title')?.value;
    const caseRequireTitleInCreation: boolean = _navigationItemTaskData[0].fields
      .find(field => field.stringId === 'case_require_title_in_creation')?.value;
    const newCaseButtonConfig: NewCaseCreationConfigurationData = {
      enableCaseTitle: enableCaseTitle,
      isCaseTitleRequired: caseRequireTitleInCreation,
      newCaseButtonConfig: {
        createCaseButtonTitle,
        createCaseButtonIcon,
      },
    };

    const caseIndexContext = {
      menuItemViewId: this._viewIdSegment,
    };
    this.tabs = [
      {
        label: {text: labelData.name, icon: labelData.icon},
        canBeClosed: false,
        tabContentComponent: DefaultTabbedCaseViewComponent,
        injectedObject: {
          tabViewComponent: DefaultTabbedTaskViewComponent,
          tabViewOrder: 0,
          navigationItemTaskData: this._navigationItemTaskData,
          newCaseButtonConfiguration: newCaseButtonConfig,
          caseIndexContext: caseIndexContext,
        },
      },
    ];
  }

}

