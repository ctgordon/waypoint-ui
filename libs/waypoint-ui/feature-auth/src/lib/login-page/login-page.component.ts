import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '@auth0/auth0-angular';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TokenStorageService } from '@waypoint-ui/shared-util-auth';
import { APP_CONFIG, joinUrl } from '@waypoint-ui/shared-util-config';

type TokenResponse = {
  accessToken: string;
  tokenType: string;
};

@Component({
  selector: 'wp-login-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenStorage = inject(TokenStorageService);
  private readonly auth = inject(AuthService);
  private readonly config = inject(APP_CONFIG);

  readonly loginForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });

  signInWithAuth0(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/app/dashboard',
      },
    });
  }

  signInWithDevToken(): void {
    this.http
      .post<TokenResponse>(
        joinUrl(this.config.authBaseUrl, '/auth/token?sub=chris&roles=USER'),
        {},
      )
      .subscribe((response) => {
        this.tokenStorage.setAccessToken(response.accessToken);
        this.router.navigateByUrl('/app/dashboard');
      });
  }

  get emailFormControl(): FormControl {
    return this.loginForm.get('emailFormControl') as FormControl;
  }
}
