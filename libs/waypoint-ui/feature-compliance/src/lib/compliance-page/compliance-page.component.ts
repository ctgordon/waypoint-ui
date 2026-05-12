import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  ErrorStateComponent,
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
  ],
  templateUrl: './compliance-page.component.html',
  styleUrl: './compliance-page.component.scss',
})
export class CompliancePageComponent {
  private readonly complianceApi = inject(ComplianceApiService);

  search = '';
  selectedStatus = 'ALL';

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
        const query = this.search.toLowerCase();

        const matchesSearch =
          !query || item.registration.toLowerCase().includes(query);

        const matchesStatus =
          this.selectedStatus === 'ALL' || item.status === this.selectedStatus;

        return matchesSearch && matchesStatus;
      }),
    );
  }
}
