import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  ApiViewState,
  MaintenanceApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';
import { MaintenanceEventSummary } from '@waypoint-ui/shared-models';
import {
  EmptyStateComponent,
  ErrorStateComponent,
  LoadingStateComponent,
  SectionPanelComponent,
  StatusPillComponent,
  WaypointStatusTone,
} from '@waypoint-ui/shared-ui';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'wp-aircraft-maintenance-panel',
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
  templateUrl: './aircraft-maintenance-panel.component.html',
  styleUrl: './aircraft-maintenance-panel.component.scss',
})
export class AircraftMaintenancePanelComponent {
  private readonly maintenanceApi = inject(MaintenanceApiService);

  viewState$: Observable<ApiViewState<MaintenanceEventSummary[]>> =
    toApiViewState(of([]));

  aircraftIdValue = '';

  @Input({ required: true })
  set aircraftId(value: string) {
    this.aircraftIdValue = value;

    this.viewState$ = toApiViewState(
      value ? this.maintenanceApi.listForAircraft(value) : of([]),
    );
  }

  statusTone(status: string): WaypointStatusTone {
    switch (status) {
      case 'PLANNED':
      case 'SCHEDULED':
        return 'scheduled';
      case 'IN_PROGRESS':
        return 'attention';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'neutral';
      default:
        return 'neutral';
    }
  }

  dueTone(dueDate: string | null): WaypointStatusTone {
    if (!dueDate) return 'neutral';

    const days = Math.ceil(
      (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );

    if (days < 0) return 'overdue';
    if (days <= 30) return 'due-soon';

    return 'scheduled';
  }

  dueLabel(dueDate: string | null): string {
    if (!dueDate) return 'No due date';

    const days = Math.ceil(
      (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );

    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return 'Due today';

    return `Due in ${days} days`;
  }

  formatLabel(value: string): string {
    return value.replace(/_/g, ' ');
  }
}
