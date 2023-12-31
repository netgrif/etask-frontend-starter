import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  AuthenticationService,
  PublicUrlResolverService,
  RedirectService,
  SessionService,
  UserService,
} from '@netgrif/components-core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-public-resolver',
  templateUrl: './public-resolver.component.html',
  styleUrls: ['./public-resolver.component.scss'],
})
export class PublicResolverComponent implements OnInit, OnDestroy {

  private _userSub: Subscription;

  constructor(protected _userService: UserService, protected _sessionService: SessionService, protected _router: Router,
              protected _auth: AuthenticationService, protected _publicResolver: PublicUrlResolverService,
              protected redirectService: RedirectService) {
  }

  ngOnInit(): void {
    this._userSub = this._userService.user$.subscribe(user => {
      if (!!user && user.id !== '') {
        this._router.navigate([this.redirectService.parseRedirectPath(this._publicResolver.url)],
          {queryParams: this.redirectService.queryParams});
        this._publicResolver.url = undefined;
      } else {
        if (!this._sessionService.verified && !this._sessionService.isVerifying &&
          this._sessionService.isInitialized && !this._auth.isAuthenticated) {
          this._router.navigate([this.redirectService.parseRedirectPath(this._publicResolver.url)],
            {queryParams: this.redirectService.queryParams});
          this._publicResolver.url = undefined;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._userSub.unsubscribe();
  }
}
