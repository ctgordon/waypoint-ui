import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { map, switchMap } from 'rxjs';

import { AircraftApiService } from '@waypoint-ui/shared-data-access';
import { AircraftDefectsPanelComponent } from '../aircraft-defects-panel/aircraft-defects-panel.component';
import { AircraftMaintenancePanelComponent } from '../aircraft-maintenance-panel/aircraft-maintenance-panel.component';
import { AircraftDocumentsPanelComponent } from '../aircraft-documents-panel/aircraft-documents-panel.component';
import { combineLatest } from 'rxjs';
import { ComplianceApiService } from '@waypoint-ui/shared-data-access';
import { ComplianceBannerComponent } from '@waypoint-ui/shared-ui';

@Component({
  selector: 'lib-aircraft-detail-page',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatChipsModule,
    AircraftDefectsPanelComponent,
    AircraftMaintenancePanelComponent,
    AircraftDocumentsPanelComponent,
    ComplianceBannerComponent,
  ],
  templateUrl: './aircraft-detail-page.component.html',
  styleUrl: './aircraft-detail-page.component.scss',
})
export class AircraftDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly aircraftApi = inject(AircraftApiService);
  private readonly complianceApi = inject(ComplianceApiService);

  readonly aircraft$ = this.route.paramMap.pipe(
    map((params) => params.get('aircraftId') ?? ''),
    switchMap((aircraftId) => this.aircraftApi.getAircraft(aircraftId)),
  );

  readonly compliance$ = this.aircraft$.pipe(
    switchMap((aircraft) =>
      this.complianceApi.getAircraftCompliance(aircraft.aircraftId),
    ),
  );
}
