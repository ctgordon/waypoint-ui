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

export type MaintenanceEventStatus =
  | 'PLANNED'
  | 'SCHEDULED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface UpdateMaintenanceEventStatusRequest {
  status: MaintenanceEventStatus;
}

export interface UpdatedMaintenanceEventResponse {
  eventId: string;
  aircraftId: string;
  eventType: string;
  title: string;
  dueDate: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

export interface FleetMaintenanceEventSummary {
  eventId: string;
  aircraftId: string;
  registration: string;
  eventType: string;
  title: string;
  dueDate: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}
