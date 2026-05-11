export type AircraftComplianceStatus =
  | 'COMPLIANT'
  | 'ATTENTION_REQUIRED'
  | 'NON_COMPLIANT'
  | string;

export interface AircraftComplianceDetail {
  aircraftId: string;
  status: AircraftComplianceStatus;
  overdueItems: number;
  dueSoonItems: number;
  messages: string[];
}
