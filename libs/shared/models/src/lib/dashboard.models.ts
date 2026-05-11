export interface DashboardSummary {
  organisationId: string;
  totalAircraft: number;
  openDefects: number;
  inProgressDefects?: number;
  dueSoonMaintenanceEvents: number;
  nonCompliantAircraft?: number;
}

export interface DueSoonMaintenanceItem {
  eventId: string;
  aircraftId: string;
  registration: string;
  title: string;
  eventType: string;
  dueDate: string | null;
  status: string;
}
