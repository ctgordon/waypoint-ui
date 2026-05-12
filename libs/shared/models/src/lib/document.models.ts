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

export type AircraftDocumentType =
  | 'CERTIFICATE'
  | 'MAINTENANCE_RECORD'
  | 'MANUAL'
  | 'LOGBOOK'
  | 'OTHER';

export interface CreateDocumentRequest {
  documentType: AircraftDocumentType;
  title: string;
  reference: string | null;
  issueDate: string | null;
  expiryDate: string | null;
  notes: string | null;
}

export interface CreatedDocumentResponse {
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

export interface FleetDocumentSummary {
  documentId: string;
  aircraftId: string;
  registration: string;
  documentType: string;
  title: string;
  reference: string | null;
  issueDate: string | null;
  expiryDate: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}
