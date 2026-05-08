import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { map, switchMap } from 'rxjs';

import { AircraftApiService } from '@waypoint-ui/shared-data-access';

@Component({
  selector: 'lib-aircraft-detail-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink, MatCardModule, MatChipsModule],
  templateUrl: './aircraft-detail-page.component.html',
  styleUrl: './aircraft-detail-page.component.scss',
})
export class AircraftDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly aircraftApi = inject(AircraftApiService);

  readonly aircraft$ = this.route.paramMap.pipe(
    map((params) => params.get('aircraftId') ?? ''),
    switchMap((aircraftId) => this.aircraftApi.getAircraft(aircraftId)),
  );
}
