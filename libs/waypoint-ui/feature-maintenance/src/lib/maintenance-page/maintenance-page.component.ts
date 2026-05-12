import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ApiViewState,
  MaintenanceApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';
import { FleetMaintenanceEventSummary } from '@waypoint-ui/shared-models';
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
  selector: 'wp-maintenance-page',
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
  templateUrl: './maintenance-page.component.html',
  styleUrl: './maintenance-page.component.scss',
})
export class MaintenancePageComponent {
  private readonly maintenanceApi = inject(MaintenanceApiService);

  readonly viewState$ = toApiViewState(
    this.maintenanceApi.listFleetMaintenanceEvents(),
  );

  sortEvents(
    events: FleetMaintenanceEventSummary[],
  ): FleetMaintenanceEventSummary[] {
    return [...events].sort(
      (a, b) =>
        this.duePriority(a.dueDate) - this.duePriority(b.dueDate) ||
        this.statusPriority(a.status) - this.statusPriority(b.status) ||
        a.registration.localeCompare(b.registration),
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

  private duePriority(dueDate: string | null): number {
    if (!dueDate) return Number.MAX_SAFE_INTEGER;
    return new Date(dueDate).getTime();
  }

  private statusPriority(status: string): number {
    switch (status) {
      case 'IN_PROGRESS':
        return 0;
      case 'PLANNED':
      case 'SCHEDULED':
        return 1;
      case 'COMPLETED':
        return 2;
      case 'CANCELLED':
        return 3;
      default:
        return 4;
    }
  }
}
