import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

import { DashboardApiService } from '@waypoint-ui/shared-data-access';
import { MetricCardComponent, PageHeaderComponent } from '@waypoint-ui/shared-ui';

@Component({
  selector: 'lib-dashboard-page',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, MetricCardComponent, PageHeaderComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  private readonly dashboardApi = inject(DashboardApiService);

  readonly summary$ = this.dashboardApi.getSummary();
}
