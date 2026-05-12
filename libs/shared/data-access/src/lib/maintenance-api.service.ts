import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  CreatedMaintenanceEventResponse,
  CreateMaintenanceEventRequest,
  FleetMaintenanceEventSummary,
  MaintenanceEventStatus,
  MaintenanceEventSummary,
  UpdatedMaintenanceEventResponse,
} from '@waypoint-ui/shared-models';
import { APP_CONFIG, joinUrl } from '@waypoint-ui/shared-util-config';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  listForAircraft(aircraftId: string): Observable<MaintenanceEventSummary[]> {
    return this.http.get<MaintenanceEventSummary[]>(
      joinUrl(
        this.config.apiBaseUrl,
        `/v1/aircraft/${aircraftId}/maintenance-events`,
      ),
    );
  }

  createForAircraft(
    aircraftId: string,
    request: CreateMaintenanceEventRequest,
  ): Observable<CreatedMaintenanceEventResponse> {
    return this.http.post<CreatedMaintenanceEventResponse>(
      joinUrl(
        this.config.apiBaseUrl,
        `/v1/aircraft/${aircraftId}/maintenance-events`,
      ),
      request,
    );
  }

  updateStatus(
    eventId: string,
    status: MaintenanceEventStatus,
  ): Observable<UpdatedMaintenanceEventResponse> {
    return this.http.patch<UpdatedMaintenanceEventResponse>(
      joinUrl(
        this.config.apiBaseUrl,
        `/v1/maintenance-events/${eventId}/status`,
      ),
      { status },
    );
  }

  listFleetMaintenanceEvents(): Observable<FleetMaintenanceEventSummary[]> {
    return this.http.get<FleetMaintenanceEventSummary[]>(
      joinUrl(this.config.apiBaseUrl, '/v1/maintenance-events'),
    );
  }
}
