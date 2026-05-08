export interface DefectSummary {
  defectId: string;
  aircraftId: string;
  title: string;
  description: string | null;
  severity: 'MINOR' | 'MAJOR' | string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED' | string;
  reportedAt: string;
}
