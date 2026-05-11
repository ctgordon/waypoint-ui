// libs/waypoint-ui/feature-dashboard/src/lib/dashboard-page/dashboard-page.component.ts

import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';

import {
  ApiViewState,
  DashboardApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';
import {
  AircraftComplianceStatus,
  DashboardSummary,
  DueSoonMaintenanceItem,
} from '@waypoint-ui/shared-models';
import {
  EmptyStateComponent,
  ErrorStateComponent,
  LoadingStateComponent,
  MetricCardComponent,
  PageHeaderComponent,
  SectionPanelComponent,
  StatusPillComponent,
  WaypointStatusTone,
} from '@waypoint-ui/shared-ui';

interface DashboardViewModel {
  summary: DashboardSummary;
  dueSoon: DueSoonMaintenanceItem[];
  compliance: AircraftComplianceStatus[];
}

@Component({
  selector: 'wp-dashboard-page',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,

    EmptyStateComponent,
    ErrorStateComponent,
    LoadingStateComponent,
    MetricCardComponent,
    PageHeaderComponent,
    SectionPanelComponent,
    StatusPillComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  private readonly dashboardApi = inject(DashboardApiService);

  readonly viewState$ = toApiViewState(
    combineLatest({
      summary: this.dashboardApi.getSummary(),
      dueSoon: this.dashboardApi.getDueSoon(),
      compliance: this.dashboardApi.getAircraftCompliance(),
    }),
  );

  complianceTone(status: string): WaypointStatusTone {
    switch (status) {
      case 'COMPLIANT':
        return 'compliant';
      case 'ATTENTION_REQUIRED':
        return 'attention';
      case 'NON_COMPLIANT':
        return 'non-compliant';
      default:
        return 'neutral';
    }
  }

  maintenanceTone(status: string): WaypointStatusTone {
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
