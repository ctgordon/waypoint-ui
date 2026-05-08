export interface AircraftSummary {
  aircraftId: string;
  organisationId: string;
  registration: string;
  manufacturer: string;
  model: string;
  serialNumber: string | null;
  status: string;
}

export interface AircraftDetail {
  aircraftId: string;
  organisationId: string;
  registration: string;
  manufacturer: string;
  model: string;
  serialNumber: string | null;
  status: string;
}
