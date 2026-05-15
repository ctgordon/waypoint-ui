import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import {
  OrganisationApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';

@Component({
  selector: 'wp-invite-page',
  standalone: true,
  imports: [AsyncPipe, DatePipe, MatButtonModule, MatCardModule],
  templateUrl: './invite-page.component.html',
  styleUrl: './invite-page.component.scss',
})
export class InvitePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly organisationApi = inject(OrganisationApiService);

  readonly token = this.route.snapshot.queryParamMap.get('token') ?? '';

  readonly invitation$ = toApiViewState(
    this.organisationApi.getInvitation(this.token),
  );

  readonly isAuthenticated$ = this.auth.isAuthenticated$;

  signIn(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: `/invite?token=${this.token}`,
      },
    });
  }

  acceptInvite(): void {
    this.organisationApi.acceptInvitation(this.token).subscribe({
      next: () => this.router.navigateByUrl('/app/dashboard'),
    });
  }
}
