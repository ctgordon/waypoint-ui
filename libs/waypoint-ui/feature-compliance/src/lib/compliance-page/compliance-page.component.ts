import { Component } from '@angular/core';
import { PageHeaderComponent, SectionPanelComponent } from '@waypoint-ui/shared-ui';

@Component({
  selector: 'lib-compliance-page',
  imports: [PageHeaderComponent, SectionPanelComponent],
  templateUrl: './compliance-page.component.html',
  styleUrl: './compliance-page.component.scss',
})
export class CompliancePageComponent {}
