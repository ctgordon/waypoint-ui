import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

import {
  ApiViewState,
  DefectsApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';
import { DefectStatus, DefectSummary } from '@waypoint-ui/shared-models';
import {
  EmptyStateComponent,
  ErrorStateComponent,
  LoadingStateComponent,
  SectionPanelComponent,
  StatusPillComponent,
  WaypointStatusTone,
} from '@waypoint-ui/shared-ui';

@Component({
  selector: 'wp-aircraft-defects-panel',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,

    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,

    EmptyStateComponent,
    ErrorStateComponent,
    LoadingStateComponent,
    SectionPanelComponent,
    StatusPillComponent,
  ],
  templateUrl: './aircraft-defects-panel.component.html',
  styleUrl: './aircraft-defects-panel.component.scss',
})
export class AircraftDefectsPanelComponent {
  private readonly defectsApi = inject(DefectsApiService);
  private readonly snackBar = inject(MatSnackBar);

  aircraftIdValue = '';

  viewState$: Observable<ApiViewState<DefectSummary[]>> = toApiViewState(
    of([]),
  );

  @Input({ required: true })
  set aircraftId(value: string) {
    this.aircraftIdValue = value;
    this.loadDefects();
  }

  loadDefects(): void {
    this.viewState$ = toApiViewState(
      this.aircraftIdValue
        ? this.defectsApi.listForAircraft(this.aircraftIdValue)
        : of([]),
    );
  }

  updateStatus(defect: DefectSummary, status: DefectStatus): void {
    this.defectsApi.updateStatus(defect.defectId, status).subscribe({
      next: () => {
        this.snackBar.open('Defect status updated', 'Dismiss', {
          duration: 2500,
        });

        this.loadDefects();
      },
      error: () => {
        this.snackBar.open(
          'Could not update defect status. Please try again.',
          'Dismiss',
          {
            duration: 3500,
          },
        );
      },
    });
  }

  canMarkInProgress(defect: DefectSummary): boolean {
    return defect.status !== 'IN_PROGRESS' && defect.status !== 'CLOSED';
  }

  canClose(defect: DefectSummary): boolean {
    return defect.status !== 'CLOSED';
  }

  severityTone(severity: string): WaypointStatusTone {
    switch (severity) {
      case 'MAJOR':
        return 'major';
      case 'MINOR':
        return 'minor';
      default:
        return 'neutral';
    }
  }

  statusTone(status: string): WaypointStatusTone {
    switch (status) {
      case 'OPEN':
        return 'danger';
      case 'IN_PROGRESS':
        return 'attention';
      case 'CLOSED':
        return 'success';
      default:
        return 'neutral';
    }
  }

  formatLabel(value: string): string {
    return value.replace(/_/g, ' ');
  }
}
