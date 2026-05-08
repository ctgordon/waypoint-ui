import { Routes } from '@angular/router';
import { ShellLayoutComponent } from './shell-layout/shell-layout.component';

export const shellRoutes: Routes = [
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@waypoint-ui/feature-dashboard').then(
            (m) => m.featureDashboardRoutes,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
];
