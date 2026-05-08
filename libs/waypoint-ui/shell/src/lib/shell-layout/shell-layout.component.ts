import { Component } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-shell-layout',
  imports: [
    MatSidenavContent,
    MatToolbar,
    RouterOutlet,
    MatSidenav,
    MatSidenavContainer,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.css',
})
export class ShellLayoutComponent {}
