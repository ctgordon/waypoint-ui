import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DocumentsApiService } from '@waypoint-ui/shared-data-access';
import { AircraftDocumentSummary } from '@waypoint-ui/shared-models';
import {
  EmptyStateComponent,
  SectionPanelComponent,
  StatusPillComponent,
  WaypointStatusTone,
} from '@waypoint-ui/shared-ui';

@Component({
  selector: 'wp-aircraft-documents-panel',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    NgFor,
    NgIf,
    EmptyStateComponent,
    SectionPanelComponent,
    StatusPillComponent,
  ],
  templateUrl: './aircraft-documents-panel.component.html',
  styleUrl: './aircraft-documents-panel.component.scss',
})
export class AircraftDocumentsPanelComponent {
  private readonly documentsApi = inject(DocumentsApiService);

  documents$: Observable<AircraftDocumentSummary[]> = of([]);

  @Input({ required: true })
  set aircraftId(value: string) {
    if (!value) {
      this.documents$ = of([]);
      return;
    }

    this.documents$ = this.documentsApi.listForAircraft(value);
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
    if (!expiryDate) {
      return 'neutral';
    }

    const expiry = new Date(expiryDate).getTime();
    const now = Date.now();
    const days = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

    if (days < 0) {
      return 'overdue';
    }

    if (days <= 30) {
      return 'due-soon';
    }

    return 'scheduled';
  }

  expiryLabel(expiryDate: string | null): string {
    if (!expiryDate) {
      return 'No expiry';
    }

    const expiry = new Date(expiryDate).getTime();
    const now = Date.now();
    const days = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

    if (days < 0) {
      return `${Math.abs(days)} days expired`;
    }

    if (days === 0) {
      return 'Expires today';
    }

    return `Expires in ${days} days`;
  }

  formatLabel(value: string): string {
    return value.replace(/_/g, ' ');
  }
}
