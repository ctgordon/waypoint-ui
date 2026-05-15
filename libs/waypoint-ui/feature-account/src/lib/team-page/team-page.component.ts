import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import {
  OrganisationApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';
import {
  EmptyStateComponent,
  ErrorStateComponent,
  LoadingStateComponent,
  PageHeaderComponent,
  SectionPanelComponent,
  StatusPillComponent,
  WaypointStatusTone,
} from '@waypoint-ui/shared-ui';
import { OrganisationMemberSummary, OrganisationInvitationSummary } from '@waypoint-ui/shared-models';

@Component({
  selector: 'wp-team-page',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    MatButtonModule,
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
  private readonly organisationApi = inject(OrganisationApiService);

  readonly viewState$ = toApiViewState<OrganisationMemberSummary[]>(
    this.organisationApi.getOrganisationMembers(),
  );

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

  formatLabel(value: string): string {
    return value.replace(/_/g, ' ');
  }

  inviteLink(invitation: OrganisationInvitationSummary): string {
    return `${window.location.origin}/invite?token=${invitation.token}`;
  }
}
