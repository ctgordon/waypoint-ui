import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  CreateOrganisationInvitationRequest,
  OrganisationInvitationSummary,
  OrganisationMemberSummary,
} from '@waypoint-ui/shared-models';
import { APP_CONFIG, joinUrl } from '@waypoint-ui/shared-util-config';

@Injectable({
  providedIn: 'root',
})
export class OrganisationApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getOrganisationMembers(): Observable<OrganisationMemberSummary[]> {
    return this.http.get<OrganisationMemberSummary[]>(
      joinUrl(this.config.apiBaseUrl, '/v1/organisations/current/members'),
    );
  }

  getOrganisationInvitations(): Observable<OrganisationInvitationSummary[]> {
    return this.http.get<OrganisationInvitationSummary[]>(
      joinUrl(this.config.apiBaseUrl, '/v1/organisations/current/invitations'),
    );
  }

  createOrganisationInvitation(
    request: CreateOrganisationInvitationRequest,
  ): Observable<OrganisationInvitationSummary> {
    return this.http.post<OrganisationInvitationSummary>(
      joinUrl(this.config.apiBaseUrl, '/v1/organisations/current/invitations'),
      request,
    );
  }
}
