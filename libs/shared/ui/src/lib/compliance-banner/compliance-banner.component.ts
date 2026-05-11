import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import {
  StatusPillComponent,
  WaypointStatusTone,
} from '../status-pill/status-pill.component';

@Component({
  selector: 'wp-compliance-banner',
  standalone: true,
  imports: [NgFor, MatIconModule, StatusPillComponent],
  templateUrl: './compliance-banner.component.html',
  styleUrl: './compliance-banner.component.scss',
})
export class ComplianceBannerComponent {
  @Input() status = 'COMPLIANT';
  @Input() overdueItems = 0;
  @Input() dueSoonItems = 0;
  @Input() messages: string[] = [];

  get tone(): WaypointStatusTone {
    switch (this.status) {
      case 'COMPLIANT':
        return 'compliant';
      case 'ATTENTION_REQUIRED':
        return 'attention';
      case 'NON_COMPLIANT':
        return 'non-compliant';
      default:
        return 'neutral';
    }
  }

  get icon(): string {
    switch (this.status) {
      case 'COMPLIANT':
        return 'verified';
      case 'ATTENTION_REQUIRED':
        return 'priority_high';
      case 'NON_COMPLIANT':
        return 'warning';
      default:
        return 'info';
    }
  }

  get title(): string {
    return this.status.replace(/_/g, ' ');
  }

  get summary(): string {
    if (this.status === 'COMPLIANT') {
      return 'This aircraft currently has no compliance issues.';
    }

    const parts: string[] = [];

    if (this.overdueItems > 0) {
      parts.push(`${this.overdueItems} overdue`);
    }

    if (this.dueSoonItems > 0) {
      parts.push(`${this.dueSoonItems} due soon`);
    }

    return parts.length > 0
      ? parts.join(' · ')
      : 'Compliance attention required.';
  }
}
