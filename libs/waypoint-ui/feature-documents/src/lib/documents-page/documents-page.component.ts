import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ApiViewState,
  DocumentsApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';
import { FleetDocumentSummary } from '@waypoint-ui/shared-models';
import {
  EmptyStateComponent,
  ErrorStateComponent,
  LoadingStateComponent,
  PageHeaderComponent,
  SectionPanelComponent,
  StatusPillComponent,
  WaypointStatusTone,
} from '@waypoint-ui/shared-ui';

@Component({
  selector: 'wp-documents-page',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,

    EmptyStateComponent,
    ErrorStateComponent,
    LoadingStateComponent,
    PageHeaderComponent,
    SectionPanelComponent,
    StatusPillComponent,
  ],
  templateUrl: './documents-page.component.html',
  styleUrl: './documents-page.component.scss',
})
export class DocumentsPageComponent {
  private readonly documentsApi = inject(DocumentsApiService);

  readonly viewState$ = toApiViewState(this.documentsApi.listFleetDocuments());

  sortDocuments(documents: FleetDocumentSummary[]): FleetDocumentSummary[] {
    return [...documents].sort(
      (a, b) =>
        this.expiryPriority(a.expiryDate) - this.expiryPriority(b.expiryDate) ||
        a.registration.localeCompare(b.registration),
    );
  }

  statusTone(status: string): WaypointStatusTone {
    switch (status) {
      case 'VALID':
      case 'ACTIVE':
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

  private expiryPriority(expiryDate: string | null): number {
    if (!expiryDate) return Number.MAX_SAFE_INTEGER;

    return new Date(expiryDate).getTime();
  }
}
