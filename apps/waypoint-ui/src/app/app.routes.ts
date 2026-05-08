import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('@waypoint-ui/feature-auth').then((m) => m.featureAuthRoutes),
  },
  {
    path: 'app',
    loadChildren: () => import('@waypoint-ui/shell').then((m) => m.shellRoutes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
