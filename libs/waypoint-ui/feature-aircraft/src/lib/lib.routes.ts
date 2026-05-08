import { Routes } from '@angular/router';

import { AircraftDetailPageComponent } from './aircraft-detail-page/aircraft-detail-page.component';
import { AircraftListPageComponent } from './aircraft-list-page/aircraft-list-page.component';

export const featureAircraftRoutes: Routes = [
  {
    path: '',
    component: AircraftListPageComponent,
  },
  {
    path: ':aircraftId',
    component: AircraftDetailPageComponent,
  },
];
