import {Injectable} from '@angular/core';
import {ConfigurationService} from '@netgrif/components-core';
import {NetgrifApplicationEngine} from '@netgrif/components-core/';
import {default as naeConfig} from '../../nae.json';

@Injectable({
  providedIn: 'root',
})
export class EtaskFrontendConfigurationService extends ConfigurationService {

  constructor() {
    super(naeConfig as unknown as NetgrifApplicationEngine);
    this.resolveConfigFromEnv();
    this.resolveEndpointURLs();
    if (this.get().autoResolveBackendUrl) {
      this.autoResolveBackendUrl();
    }
  }

  private autoResolveBackendUrl() {
    const config = this.get();
    config.providers.auth.address = location.origin + '/api';
    if (Array.isArray(config.providers.resources)) {
      config.providers.resources.forEach(resource => {
        resource.address = location.origin + '/api';
      });
    }
    this.configuration = config;
  }

  private resolveConfigFromEnv() {
    if (!window['env']) return;
    Object.keys(window['env']).forEach(key => {
      const parts = key.split('-');
      let obj = this.configuration;
      for (let i = 0; i < parts.length - 1; i++) {
        obj = obj[parts[i]];
      }
      if (!!window['env'][key] && window['env'][key] !== '') {
        obj[parts[parts.length - 1]] = window['env'][key];
      }
    });
  }

}
