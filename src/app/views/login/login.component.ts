import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  LoggerService,
  NAE_VIEW_ID_SEGMENT,
  SnackBarService,
  User,
  UserService,
  ViewIdService,
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    {
      provide: NAE_VIEW_ID_SEGMENT,
      useValue: 'login',
    },
    ViewIdService,
  ],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private _userService: UserService,
              private _snackbar: SnackBarService,
              private _translate: TranslateService,
              private _log: LoggerService) {
  }

  ngOnInit(): void {
    if (this._userService.user.id.length !== 0) {
      this.redirectToHome();
    }
  }

  onLogin(user: User) {
    if (user && user.id) {
      this.redirectToHome();
    } else {
      this._snackbar.openErrorSnackBar(this._translate.instant('forms.login.wrongCredentials'));
    }
  }

  private redirectToHome() {
    this.router.navigate(['/dashboard']).then((value) => {
      this._log.debug('Routed to ' + value);
    });
  }


}
