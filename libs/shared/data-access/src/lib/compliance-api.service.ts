import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AircraftComplianceDetail } from '@waypoint-ui/shared-models';

@Injectable({
  providedIn: 'root',
})
export class ComplianceApiService {
  private readonly http = inject(HttpClient);

  getAircraftCompliance(
    aircraftId: string,
  ): Observable<AircraftComplianceDetail> {
    return this.http.get<AircraftComplianceDetail>(
      `http://localhost:8080/v1/aircraft/${aircraftId}/compliance`,
    );
  }
}
