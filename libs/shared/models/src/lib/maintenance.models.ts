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

export type MaintenanceEventType =
  | 'INSPECTION'
  | 'SERVICE'
  | 'OIL_CHANGE'
  | 'AD_HOC';

export interface CreateMaintenanceEventRequest {
  eventType: MaintenanceEventType;
  title: string;
  dueDate: string | null;
  notes: string | null;
}

export interface CreatedMaintenanceEventResponse {
  eventId: string;
  aircraftId: string;
  eventType: string;
  title: string;
  dueDate: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}
