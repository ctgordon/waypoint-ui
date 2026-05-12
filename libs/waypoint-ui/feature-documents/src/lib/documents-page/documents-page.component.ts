import { Component } from '@angular/core';
import { PageHeaderComponent, SectionPanelComponent } from '@waypoint-ui/shared-ui';

@Component({
  selector: 'lib-documents-page',
  imports: [PageHeaderComponent, SectionPanelComponent],
  templateUrl: './documents-page.component.html',
  styleUrl: './documents-page.component.scss',
})
export class DocumentsPageComponent {}
