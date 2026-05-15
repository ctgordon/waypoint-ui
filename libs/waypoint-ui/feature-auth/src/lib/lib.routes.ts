import { Routes } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { OnboardingPageComponent } from './onboarding-page/onboarding-page.component';
import { InvitePageComponent } from './invite-page/invite-page.component';

export const featureAuthRoutes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'onboarding',
    component: OnboardingPageComponent,
  },
  {
    path: 'invite',
    component: InvitePageComponent,
  },
];
