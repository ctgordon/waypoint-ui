import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
  allToNull,
  emptyToNull,
  normaliseQuery,
  queryParamOrDefault,
} from '@waypoint-ui/shared-util-config';
import {
  EmptyStateComponent,
  ErrorStateComponent,
  FilterPanelComponent,
  LoadingStateComponent,
  MetricCardComponent,
  PageHeaderComponent,
  SectionPanelComponent,
  StatusPillComponent,
  WaypointStatusTone,
} from '@waypoint-ui/shared-ui';

interface ComplianceViewModel {
  summary: ComplianceSummary;
  aircraft: AircraftComplianceStatus[];
}

@Component({
  selector: 'wp-compliance-page',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    EmptyStateComponent,
    ErrorStateComponent,
    FilterPanelComponent,
    LoadingStateComponent,
    MetricCardComponent,
    PageHeaderComponent,
    SectionPanelComponent,
    StatusPillComponent,
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

  readonly viewState$ = toApiViewState(
    combineLatest({
      summary: this.complianceApi.getSummary(),
      aircraft: this.complianceApi.getAircraftCompliance(),
    }),
  );

  constructor() {
    const params = this.route.snapshot.queryParamMap;

    this.search.set(params.get('search') ?? '');
    this.selectedStatus.set(queryParamOrDefault(params.get('status')));

    effect(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          search: emptyToNull(this.search()),
          status: allToNull(this.selectedStatus()),
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  clearFilters(): void {
    this.search.set('');
    this.selectedStatus.set('ALL');
  }

  filteredAircraft(
    aircraft: AircraftComplianceStatus[],
  ): AircraftComplianceStatus[] {
    return this.sortAircraft(
      aircraft.filter((item) => {
        const query = normaliseQuery(this.search());

        const matchesSearch =
          !query || item.registration.toLowerCase().includes(query);

        const matchesStatus =
          this.selectedStatus() === 'ALL' ||
          item.status === this.selectedStatus();

        return matchesSearch && matchesStatus;
      }),
    );
  }

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
}
