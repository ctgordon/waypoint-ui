export type AircraftComplianceState =
  | 'COMPLIANT'
  | 'ATTENTION_REQUIRED'
  | 'NON_COMPLIANT'
  | string;

export interface AircraftComplianceDetail {
  aircraftId: string;
  status: AircraftComplianceState;
  overdueItems: number;
  dueSoonItems: number;
  messages: string[];
}

export interface AircraftComplianceStatus {
  aircraftId: string;
  registration: string;
  status: AircraftComplianceState;
}
