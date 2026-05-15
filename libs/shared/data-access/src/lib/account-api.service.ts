import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AccountSummary,
  CreateAccountRequest,
} from '@waypoint-ui/shared-models';
import { APP_CONFIG, joinUrl } from '@waypoint-ui/shared-util-config';

@Injectable({
  providedIn: 'root',
})
export class AccountApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  getMe(): Observable<AccountSummary> {
    return this.http.get<AccountSummary>(
      joinUrl(this.config.apiBaseUrl, '/v1/account/me'),
    );
  }

  createAccount(request: CreateAccountRequest): Observable<AccountSummary> {
    return this.http.post<AccountSummary>(
      joinUrl(this.config.apiBaseUrl, '/v1/onboarding/account'),
      request,
    );
  }
}
