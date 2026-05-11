import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { MaintenanceEventSummary } from '@waypoint-ui/shared-models';
import { APP_CONFIG, joinUrl } from '@waypoint-ui/shared-util-config';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  listForAircraft(aircraftId: string): Observable<MaintenanceEventSummary[]> {
    return this.http.get<MaintenanceEventSummary[]>(
      joinUrl(this.config.apiBaseUrl,`/v1/aircraft/${aircraftId}/maintenance-events`),
    );
  }
}
