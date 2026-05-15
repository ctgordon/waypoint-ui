import { Routes } from '@angular/router';
import { AuthCallbackPageComponent } from './auth-call-back-page.component';
import { OnboardingPageComponent } from '@waypoint-ui/feature-auth';

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
    path: 'callback',
    component: AuthCallbackPageComponent,
  },
  {
    path: 'onboarding',
    component: OnboardingPageComponent,
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
