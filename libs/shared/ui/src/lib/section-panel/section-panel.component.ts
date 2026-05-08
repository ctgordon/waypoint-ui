import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'wp-section-panel',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './section-panel.component.html',
  styleUrl: './section-panel.component.scss',
})
export class SectionPanelComponent {
  @Input() title = '';
  @Input() description = '';
}
