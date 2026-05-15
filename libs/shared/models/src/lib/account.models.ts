export interface CreateAccountRequest {
  organisationName: string;
}

export interface AccountSummary {
  userId: string;
  email: string;
  organisationId: string;
  organisationName: string;
  plan: string;
}
