import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import {
  ApiViewState,
  MaintenanceApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';
import { FleetMaintenanceEventSummary } from '@waypoint-ui/shared-models';
import {
  EmptyStateComponent,
  ErrorStateComponent,
  FilterPanelComponent,
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
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FilterPanelComponent,
  ],
  templateUrl: './maintenance-page.component.html',
  styleUrl: './maintenance-page.component.scss',
})
export class MaintenancePageComponent {
  private readonly maintenanceApi = inject(MaintenanceApiService);

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly search = signal('');
  readonly selectedStatus = signal('ALL');
  readonly selectedDue = signal('ALL');

  constructor() {
    const params = this.route.snapshot.queryParamMap;

    this.search.set(params.get('search') ?? '');
    this.selectedStatus.set(params.get('status') ?? 'ALL');
    this.selectedDue.set(params.get('due') ?? 'ALL');

    effect(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          search: this.search() || null,
          status:
            this.selectedStatus() === 'ALL' ? null : this.selectedStatus(),
          due: this.selectedDue() === 'ALL' ? null : this.selectedDue(),
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

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

  filteredEvents(
    events: FleetMaintenanceEventSummary[],
  ): FleetMaintenanceEventSummary[] {
    return this.sortEvents(
      events.filter((event) => {
        const query = this.search().toLowerCase();

        const matchesSearch =
          !query ||
          event.registration.toLowerCase().includes(query) ||
          event.title.toLowerCase().includes(query);

        const matchesStatus =
          this.selectedStatus() === 'ALL' ||
          event.status === this.selectedStatus();

        const matchesDue =
          this.selectedDue() === 'ALL' || this.matchesDueFilter(event.dueDate);

        return matchesSearch && matchesStatus && matchesDue;
      }),
    );
  }

  private matchesDueFilter(dueDate: string | null): boolean {
    if (this.selectedDue() === 'NO_DUE_DATE') {
      return !dueDate;
    }

    if (!dueDate) {
      return false;
    }

    const days = Math.ceil(
      (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );

    switch (this.selectedDue()) {
      case 'OVERDUE':
        return days < 0;

      case 'DUE_SOON':
        return days >= 0 && days <= 30;

      default:
        return true;
    }
  }
}
