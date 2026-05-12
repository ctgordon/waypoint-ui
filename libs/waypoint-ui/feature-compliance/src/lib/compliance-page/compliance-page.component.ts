import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';

import {
  ComplianceApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';

import {
  AircraftComplianceStatus,
  ComplianceSummary,
} from '@waypoint-ui/shared-models';

import {
  EmptyStateComponent,
  ErrorStateComponent, FilterPanelComponent,
  LoadingStateComponent,
  MetricCardComponent,
  PageHeaderComponent,
  SectionPanelComponent,
  StatusPillComponent,
  WaypointStatusTone,
} from '@waypoint-ui/shared-ui';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface ComplianceViewModel {
  summary: ComplianceSummary;
  aircraft: AircraftComplianceStatus[];
}

@Component({
  selector: 'wp-compliance-page',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,

    EmptyStateComponent,
    ErrorStateComponent,
    LoadingStateComponent,
    MetricCardComponent,
    PageHeaderComponent,
    SectionPanelComponent,
    StatusPillComponent,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FilterPanelComponent,
  ],
  templateUrl: './compliance-page.component.html',
  styleUrl: './compliance-page.component.scss',
})
export class CompliancePageComponent {
  private readonly complianceApi = inject(ComplianceApiService);

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly search = signal('');
  readonly selectedStatus = signal('ALL');

  constructor() {
    const params = this.route.snapshot.queryParamMap;

    this.search.set(params.get('search') ?? '');
    this.selectedStatus.set(params.get('status') ?? 'ALL');

    effect(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          search: this.search() || null,
          status:
            this.selectedStatus() === 'ALL' ? null : this.selectedStatus(),
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  readonly viewState$ = toApiViewState(
    combineLatest({
      summary: this.complianceApi.getSummary(),
      aircraft: this.complianceApi.getAircraftCompliance(),
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

  formatLabel(value: string): string {
    return value.replace(/_/g, ' ');
  }

  sortAircraft(
    aircraft: AircraftComplianceStatus[],
  ): AircraftComplianceStatus[] {
    return [...aircraft].sort(
      (a, b) =>
        this.priority(a.status) - this.priority(b.status) ||
        a.registration.localeCompare(b.registration),
    );
  }

  private priority(status: string): number {
    switch (status) {
      case 'NON_COMPLIANT':
        return 0;

      case 'ATTENTION_REQUIRED':
        return 1;

      case 'COMPLIANT':
        return 2;

      default:
        return 3;
    }
  }

  filteredAircraft(
    aircraft: AircraftComplianceStatus[],
  ): AircraftComplianceStatus[] {
    return this.sortAircraft(
      aircraft.filter((item) => {
        const query = this.search().toLowerCase();

        const matchesSearch =
          !query || item.registration.toLowerCase().includes(query);

        const matchesStatus =
          this.selectedStatus() === 'ALL' ||
          item.status === this.selectedStatus();

        return matchesSearch && matchesStatus;
      }),
    );
  }
}
