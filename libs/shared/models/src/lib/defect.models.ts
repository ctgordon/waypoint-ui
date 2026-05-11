export interface DefectSummary {
  defectId: string;
  aircraftId: string;
  title: string;
  description: string | null;
  severity: 'MINOR' | 'MAJOR' | string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED' | string;
  reportedAt: string;
}

export interface CreateDefectRequest {
  title: string;
  description: string | null;
  severity: 'MINOR' | 'MAJOR';
}

export interface CreatedDefectResponse {
  defectId: string;
  aircraftId: string;
  title: string;
  description: string | null;
  severity: string;
  status: string;
  reportedAt: string;
}
