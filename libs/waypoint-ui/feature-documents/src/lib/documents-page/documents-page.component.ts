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
  ErrorStateComponent, FilterPanelComponent,
  LoadingStateComponent,
  PageHeaderComponent,
  SectionPanelComponent,
  StatusPillComponent,
  WaypointStatusTone,
} from '@waypoint-ui/shared-ui';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FilterPanelComponent,
  ],
  templateUrl: './documents-page.component.html',
  styleUrl: './documents-page.component.scss',
})
export class DocumentsPageComponent {
  private readonly documentsApi = inject(DocumentsApiService);

  search = '';
  selectedType = 'ALL';
  selectedStatus = 'ALL';
  selectedExpiry = 'ALL';

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

  filteredDocuments(documents: FleetDocumentSummary[]): FleetDocumentSummary[] {
    return this.sortDocuments(
      documents.filter((document) => {
        const query = this.search.toLowerCase();

        const matchesSearch =
          !query ||
          document.registration.toLowerCase().includes(query) ||
          document.title.toLowerCase().includes(query) ||
          document.reference?.toLowerCase().includes(query);

        const matchesType =
          this.selectedType === 'ALL' ||
          document.documentType === this.selectedType;

        const matchesStatus =
          this.selectedStatus === 'ALL' ||
          document.status === this.selectedStatus;

        const matchesExpiry =
          this.selectedExpiry === 'ALL' ||
          this.matchesExpiryFilter(document.expiryDate);

        return matchesSearch && matchesType && matchesStatus && matchesExpiry;
      }),
    );
  }

  private matchesExpiryFilter(expiryDate: string | null): boolean {
    if (this.selectedExpiry === 'NO_EXPIRY') {
      return !expiryDate;
    }

    if (!expiryDate) {
      return false;
    }

    const days = Math.ceil(
      (new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );

    switch (this.selectedExpiry) {
      case 'EXPIRED':
        return days < 0;

      case 'EXPIRING_SOON':
        return days >= 0 && days <= 30;

      default:
        return true;
    }
  }
}
