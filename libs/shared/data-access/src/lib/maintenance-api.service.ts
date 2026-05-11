import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { MaintenanceEventSummary } from '@waypoint-ui/shared-models';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceApiService {
  private readonly http = inject(HttpClient);

  listForAircraft(aircraftId: string): Observable<MaintenanceEventSummary[]> {
    return this.http.get<MaintenanceEventSummary[]>(
      `http://localhost:8080/v1/aircraft/${aircraftId}/maintenance-events`,
    );
  }
}
