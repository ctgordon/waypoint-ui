import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MaintenanceApiService } from '@waypoint-ui/shared-data-access';
import { MaintenanceEventSummary } from '@waypoint-ui/shared-models';
import {
  EmptyStateComponent,
  SectionPanelComponent,
  StatusPillComponent,
  WaypointStatusTone,
} from '@waypoint-ui/shared-ui';

@Component({
  selector: 'wp-aircraft-maintenance-panel',
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
  templateUrl: './aircraft-maintenance-panel.component.html',
  styleUrl: './aircraft-maintenance-panel.component.scss',
})
export class AircraftMaintenancePanelComponent {
  private readonly maintenanceApi = inject(MaintenanceApiService);

  events$: Observable<MaintenanceEventSummary[]> = of([]);

  @Input({ required: true })
  set aircraftId(value: string) {
    if (!value) {
      this.events$ = of([]);
      return;
    }

    this.events$ = this.maintenanceApi.listForAircraft(value);
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
    if (!dueDate) {
      return 'neutral';
    }

    const due = new Date(dueDate).getTime();
    const now = Date.now();
    const days = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (days < 0) {
      return 'overdue';
    }

    if (days <= 30) {
      return 'due-soon';
    }

    return 'scheduled';
  }

  dueLabel(dueDate: string | null): string {
    if (!dueDate) {
      return 'No due date';
    }

    const due = new Date(dueDate).getTime();
    const now = Date.now();
    const days = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (days < 0) {
      return `${Math.abs(days)} days overdue`;
    }

    if (days === 0) {
      return 'Due today';
    }

    return `Due in ${days} days`;
  }

  formatLabel(value: string): string {
    return value.replace(/_/g, ' ');
  }
}
