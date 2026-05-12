import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  DefectsApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';
import { FleetDefectSummary } from '@waypoint-ui/shared-models';
import {
  EmptyStateComponent,
  ErrorStateComponent, FilterPanelComponent,
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
import { Router } from 'express';

@Component({
  selector: 'wp-defects-page',
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
  templateUrl: './defects-page.component.html',
  styleUrl: './defects-page.component.scss',
})
export class DefectsPageComponent {
  private readonly defectsApi = inject(DefectsApiService);

  readonly viewState$ = toApiViewState(this.defectsApi.listFleetDefects());

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly search = signal('');
  readonly selectedSeverity = signal('ALL');
  readonly selectedStatus = signal('ALL');

  constructor() {
    const params = this.route.snapshot.queryParamMap;

    this.search.set(params.get('search') ?? '');
    this.selectedSeverity.set(params.get('severity') ?? 'ALL');
    this.selectedStatus.set(params.get('status') ?? 'ALL');

    effect(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          search: this.search() || null,
          severity:
            this.selectedSeverity() === 'ALL' ? null : this.selectedSeverity(),
          status:
            this.selectedStatus() === 'ALL' ? null : this.selectedStatus(),
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  sortDefects(defects: FleetDefectSummary[]): FleetDefectSummary[] {
    return [...defects].sort(
      (a, b) =>
        this.severityPriority(a.severity) - this.severityPriority(b.severity) ||
        this.statusPriority(a.status) - this.statusPriority(b.status) ||
        new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime(),
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

  private severityPriority(severity: string): number {
    switch (severity) {
      case 'MAJOR':
        return 0;
      case 'MINOR':
        return 1;
      default:
        return 2;
    }
  }

  private statusPriority(status: string): number {
    switch (status) {
      case 'OPEN':
        return 0;
      case 'IN_PROGRESS':
        return 1;
      case 'CLOSED':
        return 2;
      default:
        return 3;
    }
  }

  filteredDefects(defects: FleetDefectSummary[]): FleetDefectSummary[] {
    return this.sortDefects(
      defects.filter((defect) => {
        const query = this.search().toLowerCase();

        const matchesSearch =
          !query ||
          defect.registration.toLowerCase().includes(query) ||
          defect.title.toLowerCase().includes(query);

        const matchesSeverity =
          this.selectedSeverity() === 'ALL' ||
          defect.severity === this.selectedSeverity();

        const matchesStatus =
          this.selectedStatus() === 'ALL' ||
          defect.status === this.selectedStatus();

        return matchesSearch && matchesSeverity && matchesStatus;
      }),
    );
  }
}
