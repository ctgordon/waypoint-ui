import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  DefectsApiService,
  ApiViewState,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';
import { DefectSummary } from '@waypoint-ui/shared-models';
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
    NgFor,
    NgIf,
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

  viewState$: Observable<ApiViewState<DefectSummary[]>> = toApiViewState(
    of([]),
  );

  @Input({ required: true })
  set aircraftId(value: string) {
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
