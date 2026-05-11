import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiViewState, DefectsApiService, toApiViewState } from '@waypoint-ui/shared-data-access';
import { DefectSummary } from '@waypoint-ui/shared-models';
import {
  EmptyStateComponent,
  ErrorStateComponent,
  LoadingStateComponent,
  SectionPanelComponent,
  StatusPillComponent,
  WaypointStatusTone
} from '@waypoint-ui/shared-ui';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'wp-aircraft-defects-panel',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    EmptyStateComponent,
    ErrorStateComponent,
    LoadingStateComponent,
    SectionPanelComponent,
    StatusPillComponent,
    MatButton,
    RouterLink,
  ],
  templateUrl: './aircraft-defects-panel.component.html',
  styleUrl: './aircraft-defects-panel.component.scss',
})
export class AircraftDefectsPanelComponent {
  private readonly defectsApi = inject(DefectsApiService);

  viewState$: Observable<ApiViewState<DefectSummary[]>> = toApiViewState(
    of([]),
  );

  aircraftIdValue = '';

  @Input({ required: true })
  set aircraftId(value: string) {
    this.aircraftIdValue = value;

    this.viewState$ = toApiViewState(
      value ? this.defectsApi.listForAircraft(value) : of([]),
    );
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
