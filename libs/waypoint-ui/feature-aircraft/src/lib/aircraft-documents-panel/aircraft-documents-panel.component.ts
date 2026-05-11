import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  ApiViewState,
  DocumentsApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';
import { AircraftDocumentSummary } from '@waypoint-ui/shared-models';
import {
  EmptyStateComponent,
  ErrorStateComponent,
  LoadingStateComponent,
  SectionPanelComponent,
  StatusPillComponent,
  WaypointStatusTone,
} from '@waypoint-ui/shared-ui';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'wp-aircraft-documents-panel',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    EmptyStateComponent,
    ErrorStateComponent,
    LoadingStateComponent,
    SectionPanelComponent,
    StatusPillComponent,
    RouterLink,
    MatButton,
  ],
  templateUrl: './aircraft-documents-panel.component.html',
  styleUrl: './aircraft-documents-panel.component.scss',
})
export class AircraftDocumentsPanelComponent {
  private readonly documentsApi = inject(DocumentsApiService);

  viewState$: Observable<ApiViewState<AircraftDocumentSummary[]>> =
    toApiViewState(of([]));

  aircraftIdValue = '';

  @Input({ required: true })
  set aircraftId(value: string) {
    this.aircraftIdValue = value;

    this.viewState$ = toApiViewState(
      value ? this.documentsApi.listForAircraft(value) : of([]),
    );
  }

  statusTone(status: string): WaypointStatusTone {
    switch (status) {
      case 'ACTIVE':
      case 'VALID':
        return 'success';
      case 'EXPIRING_SOON':
        return 'attention';
      case 'EXPIRED':
        return 'danger';
      case 'ARCHIVED':
        return 'neutral';
      default:
        return 'neutral';
    }
  }

  expiryTone(expiryDate: string | null): WaypointStatusTone {
    if (!expiryDate) return 'neutral';

    const days = Math.ceil(
      (new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );

    if (days < 0) return 'overdue';
    if (days <= 30) return 'due-soon';

    return 'scheduled';
  }

  expiryLabel(expiryDate: string | null): string {
    if (!expiryDate) return 'No expiry';

    const days = Math.ceil(
      (new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );

    if (days < 0) return `${Math.abs(days)} days expired`;
    if (days === 0) return 'Expires today';

    return `Expires in ${days} days`;
  }

  formatLabel(value: string): string {
    return value.replace(/_/g, ' ');
  }
}
