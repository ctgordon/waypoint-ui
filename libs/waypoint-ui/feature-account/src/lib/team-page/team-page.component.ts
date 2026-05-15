import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {
  OrganisationApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';
import {
  OrganisationInvitationSummary,
  OrganisationMemberSummary,
} from '@waypoint-ui/shared-models';
import {
  EmptyStateComponent,
  ErrorStateComponent,
  LoadingStateComponent,
  PageHeaderComponent,
  SectionPanelComponent,
  StatusPillComponent,
  WaypointStatusTone,
} from '@waypoint-ui/shared-ui';

interface TeamViewModel {
  members: OrganisationMemberSummary[];
  invitations: OrganisationInvitationSummary[];
}

@Component({
  selector: 'wp-team-page',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    EmptyStateComponent,
    ErrorStateComponent,
    LoadingStateComponent,
    PageHeaderComponent,
    SectionPanelComponent,
    StatusPillComponent,
  ],
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.scss',
})
export class TeamPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly organisationApi = inject(OrganisationApiService);
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  readonly roles = ['ADMIN', 'ENGINEER', 'VIEWER'];

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    role: ['VIEWER', Validators.required],
  });

  readonly viewState$ = toApiViewState<TeamViewModel>(
    this.refresh$.pipe(
      switchMap(() =>
        combineLatest({
          members: this.organisationApi.getOrganisationMembers(),
          invitations: this.organisationApi.getOrganisationInvitations(),
        }),
      ),
    ),
  );

  isInviteFormOpen = false;
  isSubmitting = false;
  errorMessage = '';
  copiedInvitationId = '';

  openInviteForm(): void {
    this.isInviteFormOpen = true;
    this.errorMessage = '';
  }

  cancelInvite(): void {
    this.isInviteFormOpen = false;
    this.errorMessage = '';
    this.form.reset({
      email: '',
      role: 'VIEWER',
    });
  }

  submitInvite(): void {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.organisationApi
      .createOrganisationInvitation(this.form.getRawValue())
      .subscribe({
          next: () => {
            this.isSubmitting = false;
            this.cancelInvite();
            this.refresh$.next();
          },
        error: () => {
          this.isSubmitting = false;
          this.errorMessage = 'Could not create invitation. Please try again.';
        },
      });
  }

  inviteLink(invitation: OrganisationInvitationSummary): string {
    return `${window.location.origin}/invite?token=${invitation.token}`;
  }

  async copyInviteLink(
    invitation: OrganisationInvitationSummary,
  ): Promise<void> {
    await navigator.clipboard.writeText(this.inviteLink(invitation));
    this.copiedInvitationId = invitation.invitationId;
  }

  roleTone(role: string): WaypointStatusTone {
    switch (role) {
      case 'OWNER':
        return 'success';
      case 'ADMIN':
        return 'attention';
      case 'ENGINEER':
        return 'scheduled';
      case 'VIEWER':
        return 'neutral';
      default:
        return 'neutral';
    }
  }

  invitationTone(status: string): WaypointStatusTone {
    switch (status) {
      case 'PENDING':
        return 'attention';
      case 'ACCEPTED':
        return 'success';
      case 'EXPIRED':
        return 'danger';
      default:
        return 'neutral';
    }
  }

  formatLabel(value: string): string {
    return value.replace(/_/g, ' ');
  }
}
