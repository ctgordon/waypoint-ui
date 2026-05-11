import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AircraftDetail, AircraftSummary } from '@waypoint-ui/shared-models';
import { APP_CONFIG, joinUrl } from '@waypoint-ui/shared-util-config';

@Injectable({
  providedIn: 'root',
})
export class AircraftApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  listAircraft(): Observable<AircraftSummary[]> {
    return this.http.get<AircraftSummary[]>(
      joinUrl(this.config.apiBaseUrl, '/v1/aircraft'),
    );
  }

  getAircraft(aircraftId: string): Observable<AircraftDetail> {
    return this.http.get<AircraftDetail>(
      joinUrl(this.config.apiBaseUrl, `/v1/aircraft/${aircraftId}`),
    );
  }
}
