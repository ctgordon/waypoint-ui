import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AircraftDetail, AircraftSummary } from '@waypoint-ui/shared-models';

@Injectable({
  providedIn: 'root',
})
export class AircraftApiService {
  private readonly http = inject(HttpClient);

  listAircraft(): Observable<AircraftSummary[]> {
    return this.http.get<AircraftSummary[]>(
      'http://localhost:8080/v1/aircraft',
    );
  }

  getAircraft(aircraftId: string): Observable<AircraftDetail> {
    return this.http.get<AircraftDetail>(
      `http://localhost:8080/v1/aircraft/${aircraftId}`,
    );
  }
}
