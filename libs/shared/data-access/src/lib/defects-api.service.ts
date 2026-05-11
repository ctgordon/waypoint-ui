import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { APP_CONFIG, joinUrl } from '@waypoint-ui/shared-util-config';
import {
  CreatedDefectResponse,
  CreateDefectRequest,
  DefectSummary,
} from '@waypoint-ui/shared-models';

@Injectable({
  providedIn: 'root',
})
export class DefectsApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  listForAircraft(aircraftId: string): Observable<DefectSummary[]> {
    return this.http.get<DefectSummary[]>(
      joinUrl(this.config.apiBaseUrl, `/v1/aircraft/${aircraftId}/defects`),
    );
  }

  createForAircraft(
    aircraftId: string,
    request: CreateDefectRequest,
  ): Observable<CreatedDefectResponse> {
    return this.http.post<CreatedDefectResponse>(
      joinUrl(this.config.apiBaseUrl, `/v1/aircraft/${aircraftId}/defects`),
      request,
    );
  }
}
