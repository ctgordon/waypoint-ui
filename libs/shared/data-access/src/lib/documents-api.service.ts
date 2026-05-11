import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AircraftDocumentSummary } from '@waypoint-ui/shared-models';

@Injectable({
  providedIn: 'root',
})
export class DocumentsApiService {
  private readonly http = inject(HttpClient);

  listForAircraft(aircraftId: string): Observable<AircraftDocumentSummary[]> {
    return this.http.get<AircraftDocumentSummary[]>(
      `http://localhost:8080/v1/aircraft/${aircraftId}/documents`,
    );
  }
}
