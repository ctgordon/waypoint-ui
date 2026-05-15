import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';

import {
  DocumentsApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';
import {
  StatusPillComponent,
  EmptyStateComponent,
  ErrorStateComponent,
  LoadingStateComponent,
  SectionPanelComponent,
  WaypointStatusTone,
} from '@waypoint-ui/shared-ui';

@Component({
  selector: 'wp-aircraft-documents-panel',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,
    MatButtonModule,
    EmptyStateComponent,
    ErrorStateComponent,
    LoadingStateComponent,
    SectionPanelComponent,
    StatusPillComponent,
  ],
  templateUrl: './aircraft-documents-panel.component.html',
  styleUrl: './aircraft-documents-panel.component.scss',
})
export class AircraftDocumentsPanelComponent {
  private readonly documentsApi = inject(DocumentsApiService);
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  aircraftIdValue = '';

  @Input({ required: true })
  set aircraftId(value: string) {
    this.aircraftIdValue = value;
    this.refresh$.next();
  }

  readonly viewState$ = toApiViewState(
    this.refresh$.pipe(
      switchMap(() =>
        this.documentsApi.listForAircraft(this.aircraftIdValue),
      ),
    ),
  );

  uploadFile(documentId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.documentsApi.uploadDocumentFile(documentId, file).subscribe({
      next: () => {
        input.value = '';
        this.refresh$.next();
      },
    });
  }

  downloadFile(documentId: string, fileName: string | null): void {
    this.documentsApi.downloadDocumentFile(documentId).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');

      anchor.href = url;
      anchor.download = fileName ?? 'document';
      anchor.click();

      window.URL.revokeObjectURL(url);
    });
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

  formatFileSize(sizeBytes: number | null): string {
    if (!sizeBytes) return '';

    if (sizeBytes < 1024 * 1024) {
      return `${Math.round(sizeBytes / 1024)} KB`;
    }

    return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
