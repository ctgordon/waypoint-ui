import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'lib-shell-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,

    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './shell-layout.component.html',
  styleUrls: ['./shell-layout.component.scss'],
})
export class ShellLayoutComponent {
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
}
