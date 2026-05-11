import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardSummary } from '@waypoint-ui/shared-models';
import { APP_CONFIG, joinUrl } from '@waypoint-ui/shared-util-config';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(
      joinUrl(this.config.apiBaseUrl,'/v1/dashboard/summary'),
    );
  }
}
