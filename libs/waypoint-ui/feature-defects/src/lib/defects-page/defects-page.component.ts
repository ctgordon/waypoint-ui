import { Component } from '@angular/core';
import { PageHeaderComponent, SectionPanelComponent } from '@waypoint-ui/shared-ui';

@Component({
  selector: 'lib-defects-page',
  imports: [PageHeaderComponent, SectionPanelComponent],
  templateUrl: './defects-page.component.html',
  styleUrl: './defects-page.component.scss',
})
export class DefectsPageComponent {}
