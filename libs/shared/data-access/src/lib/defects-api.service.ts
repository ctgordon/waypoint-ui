import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { DefectSummary } from '@waypoint-ui/shared-models';

@Injectable({
  providedIn: 'root',
})
export class DefectsApiService {
  private readonly http = inject(HttpClient);

  listForAircraft(aircraftId: string): Observable<DefectSummary[]> {
    return this.http.get<DefectSummary[]>(
      `http://localhost:8080/v1/aircraft/${aircraftId}/defects`,
    );
  }
}
