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
      {
        path: 'aircraft',
        loadChildren: () =>
          import('@waypoint-ui/feature-aircraft').then(
            (m) => m.featureAircraftRoutes,
          ),
      },
      {
        path: 'defects',
        loadChildren: () =>
          import('@waypoint-ui/feature-defects').then(
            (m) => m.featureDefectsRoutes,
          ),
      },
      {
        path: 'maintenance',
        loadChildren: () =>
          import('@waypoint-ui/feature-maintenance').then(
            (m) => m.featureMaintenanceRoutes,
          ),
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('@waypoint-ui/feature-documents').then(
            (m) => m.featureDocumentsRoutes,
          ),
      },
      {
        path: 'compliance',
        loadChildren: () =>
          import('@waypoint-ui/feature-compliance').then(
            (m) => m.featureComplianceRoutes,
          ),
      },
    ],
  },
];
