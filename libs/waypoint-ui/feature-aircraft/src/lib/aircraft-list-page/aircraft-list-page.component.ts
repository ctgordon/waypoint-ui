import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { AircraftApiService } from '@waypoint-ui/shared-data-access';

@Component({
  selector: 'lib-aircraft-list-page',
  standalone: true,
  imports: [AsyncPipe, NgFor, RouterLink, MatCardModule, MatChipsModule],
  templateUrl: './aircraft-list-page.component.html',
  styleUrl: './aircraft-list-page.component.scss',
})
export class AircraftListPageComponent {
  private readonly aircraftApi = inject(AircraftApiService);

  readonly aircraft$ = this.aircraftApi.listAircraft();
}
