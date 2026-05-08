export interface DashboardSummary {
  organisationId: string;
  organisationName: string;

  totalAircraft: number;
  openDefects: number;
  dueSoonCount: number;
  nonCompliantAircraft: number;
}
