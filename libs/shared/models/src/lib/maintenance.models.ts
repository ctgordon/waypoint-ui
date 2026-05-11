export interface MaintenanceEventSummary {
  eventId: string;
  aircraftId: string;
  eventType: string;
  title: string;
  dueDate: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}
