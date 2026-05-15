import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AccountApiService } from '@waypoint-ui/shared-data-access';

@Component({
  selector: 'wp-onboarding-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './onboarding-page.component.html',
  styleUrl: './onboarding-page.component.scss',
})
export class OnboardingPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly accountApi = inject(AccountApiService);

  readonly form = this.fb.nonNullable.group({
    organisationName: ['', [Validators.required, Validators.maxLength(120)]],
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

    this.accountApi.createAccount(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/app/dashboard'),
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'Could not create your account. Please try again.';
      },
    });
  }
}
