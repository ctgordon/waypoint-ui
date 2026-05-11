import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { DefectsApiService } from '@waypoint-ui/shared-data-access';
import { PageHeaderComponent } from '@waypoint-ui/shared-ui';

@Component({
  selector: 'wp-create-defect-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    PageHeaderComponent,
  ],
  templateUrl: './create-defect-page.component.html',
  styleUrl: './create-defect-page.component.scss',
})
export class CreateDefectPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly defectsApi = inject(DefectsApiService);

  readonly aircraftId = this.route.snapshot.paramMap.get('aircraftId') ?? '';

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    description: [''],
    severity: ['MINOR' as 'MINOR' | 'MAJOR', Validators.required],
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

    this.defectsApi
      .createForAircraft(this.aircraftId, {
        title: value.title,
        description: value.description || null,
        severity: value.severity,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/app/aircraft', this.aircraftId]);
        },
        error: () => {
          this.isSubmitting = false;
          this.errorMessage = 'Could not report the defect. Please try again.';
        },
      });
  }
}
