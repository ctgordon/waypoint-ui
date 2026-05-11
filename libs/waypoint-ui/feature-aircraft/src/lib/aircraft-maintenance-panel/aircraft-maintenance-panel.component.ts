import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  ApiViewState,
  MaintenanceApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';
import {
  MaintenanceEventStatus,
  MaintenanceEventSummary,
} from '@waypoint-ui/shared-models';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

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
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
  ],
  templateUrl: './aircraft-maintenance-panel.component.html',
  styleUrl: './aircraft-maintenance-panel.component.scss',
})
export class AircraftMaintenancePanelComponent {
  private readonly maintenanceApi = inject(MaintenanceApiService);
  private readonly snackBar = inject(MatSnackBar);

  viewState$: Observable<ApiViewState<MaintenanceEventSummary[]>> =
    toApiViewState(of([]));

  aircraftIdValue = '';

  @Input({ required: true })
  set aircraftId(value: string) {
    this.aircraftIdValue = value;
    this.loadEvents();
  }

  loadEvents(): void {
    this.viewState$ = toApiViewState(
      this.aircraftIdValue
        ? this.maintenanceApi.listForAircraft(this.aircraftIdValue)
        : of([]),
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

  updateStatus(
    event: MaintenanceEventSummary,
    status: MaintenanceEventStatus,
  ): void {
    this.maintenanceApi.updateStatus(event.eventId, status).subscribe({
      next: () => {
        this.snackBar.open('Maintenance event status updated', 'Dismiss', {
          duration: 2500,
        });

        this.loadEvents();
      },
      error: () => {
        this.snackBar.open(
          'Could not update maintenance event status. Please try again.',
          'Dismiss',
          {
            duration: 3500,
          },
        );
      },
    });
  }

  canSchedule(event: MaintenanceEventSummary): boolean {
    return event.status === 'PLANNED';
  }

  canStart(event: MaintenanceEventSummary): boolean {
    return event.status === 'PLANNED' || event.status === 'SCHEDULED';
  }

  canComplete(event: MaintenanceEventSummary): boolean {
    return event.status === 'IN_PROGRESS' || event.status === 'SCHEDULED';
  }

  canCancel(event: MaintenanceEventSummary): boolean {
    return event.status !== 'COMPLETED' && event.status !== 'CANCELLED';
  }

  hasActions(event: MaintenanceEventSummary): boolean {
    return event.status !== 'COMPLETED' && event.status !== 'CANCELLED';
  }
}
