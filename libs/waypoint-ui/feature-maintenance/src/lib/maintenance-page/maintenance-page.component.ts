import { Component } from '@angular/core';
import { PageHeaderComponent, SectionPanelComponent } from '@waypoint-ui/shared-ui';

@Component({
  selector: 'lib-maintenance-page',
  imports: [PageHeaderComponent, SectionPanelComponent],
  templateUrl: './maintenance-page.component.html',
  styleUrl: './maintenance-page.component.scss',
})
export class MaintenancePageComponent {}
