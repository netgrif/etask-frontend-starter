import {AfterViewInit, Component, Optional} from '@angular/core';
import {
  AbstractWorkflowPanelComponent,
  ConfigurationService,
  LoggerService,
  OverflowService,
  PetriNetResourceService,
  SnackBarService,
  TextField,
  WorkflowViewService,
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-workflow-panel',
  templateUrl: './workflow-panel.component.html',
  styleUrls: ['./workflow-panel.component.scss'],
})
export class WorkflowPanelComponent extends AbstractWorkflowPanelComponent implements AfterViewInit {

  readonly location = location;
  publicUrlTextField: TextField;

  constructor(log: LoggerService,
              translate: TranslateService,
              workflowService: WorkflowViewService,
              petriNetResource: PetriNetResourceService,
              private _config: ConfigurationService,
              private _snackbar: SnackBarService,
              @Optional() overflowService: OverflowService) {
    super(log, translate, workflowService, petriNetResource, overflowService);
    translate.onLangChange.subscribe(() => {
      this.publicUrlTextField.title = this._translate.instant('workflow.publicUrl');
    });
  }

  ngAfterViewInit() {
    const publicViewPath = this._config.getPathsByView('publicTaskView')[0];
    let encodedIdentifier = btoa(this.panelContent.netIdentifier.value);
    encodedIdentifier = encodedIdentifier.endsWith('=') ? encodedIdentifier.substring(0, encodedIdentifier.length - 1) : encodedIdentifier;
    const publicUrl = location.origin + publicViewPath.substring(0, publicViewPath.indexOf('/:')) + '/' + encodedIdentifier;
    this.publicUrlTextField = new TextField(this.panelContent.netIdentifier + '-publicUrl', this._translate.instant('workflow.publicUrl'), publicUrl, {visible: true});
  }

  public copyToClipboard(content: string) {
    navigator.clipboard.writeText(content).then(() => {
      this._snackbar.openSuccessSnackBar(this._translate.instant('snackbar.publicUrlCopied'));
    });
  }

}
