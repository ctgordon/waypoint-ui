export interface AircraftDocumentSummary {
  documentId: string;
  aircraftId: string;
  documentType: string;
  title: string;
  reference: string | null;
  issueDate: string | null;
  expiryDate: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}
