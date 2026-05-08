import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Observable, of } from 'rxjs';

import { DefectsApiService } from '@waypoint-ui/shared-data-access';
import { DefectSummary } from '@waypoint-ui/shared-models';
import {
  EmptyStateComponent,
  SectionPanelComponent,
  StatusPillComponent,
  WaypointStatusTone,
} from '@waypoint-ui/shared-ui';

@Component({
  selector: 'wp-aircraft-defects-panel',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    NgFor,
    NgIf,
    MatDividerModule,
    EmptyStateComponent,
    SectionPanelComponent,
    StatusPillComponent,
  ],
  templateUrl: './aircraft-defects-panel.component.html',
  styleUrl: './aircraft-defects-panel.component.scss',
})
export class AircraftDefectsPanelComponent {
  private readonly defectsApi = inject(DefectsApiService);

  defects$: Observable<DefectSummary[]> = of([]);

  @Input({ required: true })
  set aircraftId(value: string) {
    if (!value) {
      this.defects$ = of([]);
      return;
    }

    this.defects$ = this.defectsApi.listForAircraft(value);
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
}
