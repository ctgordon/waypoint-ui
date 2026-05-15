import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AccountApiService } from '@waypoint-ui/shared-data-access';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'lib-shell-layout',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,

    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './shell-layout.component.html',
  styleUrls: ['./shell-layout.component.scss'],
})
export class ShellLayoutComponent {
  private readonly auth = inject(AuthService);
  private readonly accountApi = inject(AccountApiService);

  readonly account$ = this.accountApi.getMe();

  readonly navItems: NavItem[] = [
    {
      label: 'Dashboard',
      route: '/app/dashboard',
      icon: 'dashboard',
    },
    {
      label: 'Aircraft',
      route: '/app/aircraft',
      icon: 'flight',
    },
    {
      label: 'Defects',
      route: '/app/defects',
      icon: 'warning',
    },
    {
      label: 'Maintenance',
      route: '/app/maintenance',
      icon: 'build',
    },
    {
      label: 'Documents',
      route: '/app/documents',
      icon: 'description',
    },
    {
      label: 'Compliance',
      route: '/app/compliance',
      icon: 'verified',
    },
  ];

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: `${window.location.origin}/login`,
      },
    });
  }
}
