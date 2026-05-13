import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter, take } from 'rxjs';

@Component({
  selector: 'wp-auth-callback-page',
  standalone: true,
  imports: [],
  template: `<p>Signing you in...</p>`,
})
export class AuthCallbackPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    this.auth.isLoading$
      .pipe(
        filter((isLoading) => !isLoading),
        take(1),
      )
      .subscribe(() => {
        this.router.navigateByUrl('/app/dashboard');
      });
  }
}
