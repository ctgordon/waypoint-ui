import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AircraftComplianceDetail,
  AircraftComplianceStatus,
  ComplianceSummary,
} from '@waypoint-ui/shared-models';
import { APP_CONFIG, joinUrl } from '@waypoint-ui/shared-util-config';

@Injectable({
  providedIn: 'root',
})
export class ComplianceApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getSummary(): Observable<ComplianceSummary> {
    return this.http.get<ComplianceSummary>(
      joinUrl(this.config.apiBaseUrl, '/v1/compliance/summary'),
    );
  }

  getAircraftCompliance(): Observable<AircraftComplianceStatus[]> {
    return this.http.get<AircraftComplianceStatus[]>(
      joinUrl(this.config.apiBaseUrl, '/v1/compliance/aircraft'),
    );
  }

  getAircraftComplianceDetail(
    aircraftId: string,
  ): Observable<AircraftComplianceDetail> {
    return this.http.get<AircraftComplianceDetail>(
      joinUrl(this.config.apiBaseUrl, `/v1/aircraft/${aircraftId}/compliance`),
    );
  }
}
