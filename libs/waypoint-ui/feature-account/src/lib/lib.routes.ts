import { Routes } from '@angular/router';

import { AccountPageComponent } from './account-page/account-page.component';
import { TeamPageComponent } from './team-page/team-page.component';

export const featureAccountRoutes: Routes = [
  {
    path: '',
    component: AccountPageComponent,
  },
  {
    path: 'team',
    component: TeamPageComponent,
  },
];
