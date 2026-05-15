export interface OrganisationMemberSummary {
  membershipId: string;
  organisationId: string;
  userId: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface OrganisationInvitationSummary {
  invitationId: string;
  organisationId: string;
  email: string;
  role: string;
  token: string;
  status: string;
  createdAt: string;
  expiresAt: string;
}

export interface CreateOrganisationInvitationRequest {
  email: string;
  role: string;
}

export interface OrganisationInvitationSummary {
  invitationId: string;
  organisationId: string;
  email: string;
  role: string;
  token: string;
  status: string;
  createdAt: string;
  expiresAt: string;
}
