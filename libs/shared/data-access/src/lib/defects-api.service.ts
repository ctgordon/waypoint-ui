import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { APP_CONFIG, joinUrl } from '@waypoint-ui/shared-util-config';
import {
  CreatedDefectResponse,
  CreateDefectRequest,
  DefectStatus,
  DefectSummary,
  UpdatedDefectResponse,
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

  updateStatus(
    defectId: string,
    status: DefectStatus,
  ): Observable<UpdatedDefectResponse> {
    return this.http.patch<UpdatedDefectResponse>(
      joinUrl(this.config.apiBaseUrl, `/v1/defects/${defectId}/status`),
      { status },
    );
  }
}
