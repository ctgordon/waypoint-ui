import { Component, Input } from '@angular/core';

export type WaypointStatusTone =
  | 'neutral'
  | 'compliant'
  | 'attention'
  | 'non-compliant'
  | 'critical'
  | 'major'
  | 'minor'
  | 'scheduled'
  | 'due-soon'
  | 'overdue'
  | 'success'
  | 'warning'
  | 'danger';

@Component({
  selector: 'wp-status-pill',
  standalone: true,
  templateUrl: './status-pill.component.html',
  styleUrl: './status-pill.component.scss',
})
export class StatusPillComponent {
  @Input() label = '';
  @Input() tone: WaypointStatusTone = 'neutral';
}
