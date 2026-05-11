import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { MaintenanceApiService } from '@waypoint-ui/shared-data-access';
import { MaintenanceEventType } from '@waypoint-ui/shared-models';
import { PageHeaderComponent } from '@waypoint-ui/shared-ui';

@Component({
  selector: 'wp-create-maintenance-event-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,

    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,

    PageHeaderComponent,
  ],
  templateUrl: './create-maintenance-event-page.component.html',
  styleUrl: './create-maintenance-event-page.component.scss',
})
export class CreateMaintenanceEventPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly maintenanceApi = inject(MaintenanceApiService);

  readonly aircraftId = this.route.snapshot.paramMap.get('aircraftId') ?? '';

  readonly eventTypes: MaintenanceEventType[] = [
    'INSPECTION',
    'SERVICE',
    'OIL_CHANGE',
    'AD_HOC',
  ];

  readonly form = this.fb.nonNullable.group({
    eventType: ['INSPECTION' as MaintenanceEventType, Validators.required],
    title: ['', [Validators.required, Validators.maxLength(120)]],
    dueDate: [null as Date | null],
    notes: [''],
  });

  isSubmitting = false;
  errorMessage = '';

  submit(): void {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const value = this.form.getRawValue();

    this.maintenanceApi
      .createForAircraft(this.aircraftId, {
        eventType: value.eventType,
        title: value.title,
        dueDate: value.dueDate ? value.dueDate.toISOString() : null,
        notes: value.notes || null,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/app/aircraft', this.aircraftId]);
        },
        error: () => {
          this.isSubmitting = false;
          this.errorMessage =
            'Could not create the maintenance event. Please try again.';
        },
      });
  }

  formatLabel(value: string): string {
    return value.replace(/_/g, ' ');
  }
}
