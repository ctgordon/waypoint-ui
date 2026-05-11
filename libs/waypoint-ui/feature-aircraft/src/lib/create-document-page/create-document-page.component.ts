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

import { DocumentsApiService } from '@waypoint-ui/shared-data-access';
import { AircraftDocumentType } from '@waypoint-ui/shared-models';
import { PageHeaderComponent } from '@waypoint-ui/shared-ui';

@Component({
  selector: 'wp-create-document-page',
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
  templateUrl: './create-document-page.component.html',
  styleUrl: './create-document-page.component.scss',
})
export class CreateDocumentPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly documentsApi = inject(DocumentsApiService);

  readonly aircraftId = this.route.snapshot.paramMap.get('aircraftId') ?? '';

  readonly documentTypes: AircraftDocumentType[] = [
    'CERTIFICATE',
    'MAINTENANCE_RECORD',
    'MANUAL',
    'LOGBOOK',
    'OTHER',
  ];

  readonly form = this.fb.nonNullable.group({
    documentType: ['CERTIFICATE' as AircraftDocumentType, Validators.required],
    title: ['', [Validators.required, Validators.maxLength(140)]],
    reference: [''],
    issueDate: [null as Date | null],
    expiryDate: [null as Date | null],
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

    this.documentsApi
      .createForAircraft(this.aircraftId, {
        documentType: value.documentType,
        title: value.title,
        reference: value.reference || null,
        issueDate: value.issueDate ? value.issueDate.toISOString() : null,
        expiryDate: value.expiryDate ? value.expiryDate.toISOString() : null,
        notes: value.notes || null,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/app/aircraft', this.aircraftId]);
        },
        error: () => {
          this.isSubmitting = false;
          this.errorMessage =
            'Could not create the document record. Please try again.';
        },
      });
  }

  formatLabel(value: string): string {
    return value.replace(/_/g, ' ');
  }
}
