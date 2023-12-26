import {Component} from '@angular/core';
import {AuthenticationService, LanguageService, RoutingBuilderService} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import de from '../assets/i18n/de.json';
import en from '../assets/i18n/en.json';
import sk from '../assets/i18n/sk.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'etask';


  constructor(private _languageService: LanguageService, private routingBuilder: RoutingBuilderService,
              private auth: AuthenticationService,
              private _translate: TranslateService) {

    this._translate.setTranslation('sk-SK', sk, true);
    this._translate.setTranslation('en-US', en, true);
    this._translate.setTranslation('de-DE', de, true);
    this._languageService.setLanguage('sk-SK');
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated;
  }
}
