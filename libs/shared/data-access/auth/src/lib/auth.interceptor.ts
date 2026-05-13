import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { APP_CONFIG } from '@waypoint-ui/shared-util-config';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const config = inject(APP_CONFIG);

  const isApiRequest = req.url.startsWith(config.apiBaseUrl);

  if (!isApiRequest) {
    return next(req);
  }

  return from(auth.getAccessTokenSilently()).pipe(
    switchMap((token) =>
      next(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ),
    ),
  );
};
