// libs/shared/data-access/src/lib/dashboard-api.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AircraftComplianceStatus,
  DashboardSummary,
  DueSoonMaintenanceItem,
} from '@waypoint-ui/shared-models';
import { APP_CONFIG, joinUrl } from '@waypoint-ui/shared-util-config';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(
      joinUrl(this.config.apiBaseUrl, '/v1/dashboard/summary'),
    );
  }

  getDueSoon(): Observable<DueSoonMaintenanceItem[]> {
    return this.http.get<DueSoonMaintenanceItem[]>(
      joinUrl(this.config.apiBaseUrl, '/v1/dashboard/due-soon'),
    );
  }

  getAircraftCompliance(): Observable<AircraftComplianceStatus[]> {
    return this.http.get<AircraftComplianceStatus[]>(
      joinUrl(this.config.apiBaseUrl, '/v1/compliance/aircraft'),
    );
  }
}
