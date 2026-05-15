import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AircraftDocumentSummary,
  CreatedDocumentResponse,
  CreateDocumentRequest,
  FleetDocumentSummary,
} from '@waypoint-ui/shared-models';
import { APP_CONFIG, joinUrl } from '@waypoint-ui/shared-util-config';

@Injectable({
  providedIn: 'root',
})
export class DocumentsApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  listForAircraft(aircraftId: string): Observable<AircraftDocumentSummary[]> {
    return this.http.get<AircraftDocumentSummary[]>(
      joinUrl(this.config.apiBaseUrl, `/v1/aircraft/${aircraftId}/documents`),
    );
  }

  createForAircraft(
    aircraftId: string,
    request: CreateDocumentRequest,
  ): Observable<CreatedDocumentResponse> {
    return this.http.post<CreatedDocumentResponse>(
      joinUrl(this.config.apiBaseUrl, `/v1/aircraft/${aircraftId}/documents`),
      request,
    );
  }

  listFleetDocuments(): Observable<FleetDocumentSummary[]> {
    return this.http.get<FleetDocumentSummary[]>(
      joinUrl(this.config.apiBaseUrl, '/v1/documents'),
    );
  }

  uploadDocumentFile(documentId: string, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<void>(
      joinUrl(this.config.apiBaseUrl, `/v1/documents/${documentId}/file`),
      formData,
    );
  }

  downloadDocumentFile(documentId: string): Observable<Blob> {
    return this.http.get(
      joinUrl(this.config.apiBaseUrl, `/v1/documents/${documentId}/download`),
      {
        responseType: 'blob',
      },
    );
  }
}
