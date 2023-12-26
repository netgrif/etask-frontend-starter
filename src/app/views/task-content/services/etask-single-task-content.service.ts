import {Injectable} from '@angular/core';
import {
  ChangedFields,
  FieldConverterService,
  FrontendActions,
  LoggerService,
  SingleTaskContentService,
  SnackBarService,
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class EtaskSingleTaskContentService extends SingleTaskContentService {

  private static readonly SNACKBAR_WARN_FRONTEND_ACTION = 'SNACKBAR_WARN';

  constructor(
    private _log: LoggerService,
    fieldConverterService: FieldConverterService, snackBarService: SnackBarService, translate: TranslateService, logger: LoggerService) {
    super(fieldConverterService, snackBarService, translate, logger);
  }

  reload(): void {
    this._taskDataReloadRequest$.next(undefined);
  }

  public performFrontendAction(frontendAction: FrontendActions): void {
    super.performFrontendAction(frontendAction);
    if (frontendAction && frontendAction.type === EtaskSingleTaskContentService.SNACKBAR_WARN_FRONTEND_ACTION) {
      if (!frontendAction.value) {
        this._log.error('Snackbar frontend action doesn\'t have message.');
        return;
      }
      setTimeout(() => {
        this._snackBarService.openWarningSnackBar(frontendAction.value);
      }, 0);
    }
  }

  public updateFromChangedFields(chFields: ChangedFields): void {
    if (!this._task || !this._task.dataGroups) {
      return;
    }
    const frontendActions = chFields['_frontend_actions'];
    Object.keys(chFields).forEach(changedField => {
      if (super['isFieldInTask'](chFields.taskId, changedField)) {
        super['updateField'](chFields, this.taskFieldsIndex[chFields.taskId].fields[changedField], frontendActions);
      } else if (!!super['getReferencedTaskId'](changedField)) {
        super['updateReferencedField'](chFields, this.taskFieldsIndex[super['getReferencedTaskId'](changedField)].fields[changedField], frontendActions);
      }
    });

    this.$shouldCreate.next(this._task.dataGroups);
    this.performFrontendAction(frontendActions);
  }

}
