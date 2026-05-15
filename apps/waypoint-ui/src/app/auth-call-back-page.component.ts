import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter, switchMap, take } from 'rxjs';

import { AccountApiService } from '@waypoint-ui/shared-data-access';

@Component({
  selector: 'wp-auth-callback-page',
  standalone: true,
  imports: [],
  template: `<p>Signing you in...</p>`,
})
export class AuthCallbackPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly accountApi = inject(AccountApiService);

  constructor() {
    this.auth.isLoading$
      .pipe(
        filter((isLoading) => !isLoading),
        take(1),
        switchMap(() => this.accountApi.getMe()),
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/app/dashboard');
        },
        error: (error) => {
          if (error.status === 404) {
            this.router.navigateByUrl('/onboarding');
            return;
          }

          this.router.navigateByUrl('/login');
        },
      });
  }
}
