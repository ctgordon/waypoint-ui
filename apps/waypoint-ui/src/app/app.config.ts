import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_CONFIG } from '@waypoint-ui/shared-util-config';
import { environment } from '../environments/environment';
import { provideAuth0 } from '@auth0/auth0-angular';
import { authInterceptor } from '@waypoint-ui/shared-data-access-auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: `${window.location.origin}/callback`,
        audience: environment.auth0.audience,
      },
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_CONFIG,
      useValue: environment,
    },
  ],
};
