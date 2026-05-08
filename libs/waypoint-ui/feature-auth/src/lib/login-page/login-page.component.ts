import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TokenStorageService } from '@waypoint-ui/shared-util-auth';

type TokenResponse = {
  accessToken: string;
  tokenType: string;
};

@Component({
  selector: 'lib-login-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenStorage = inject(TokenStorageService);

  signIn(): void {
    this.http
      .post<TokenResponse>(
        'http://localhost:8081/auth/token?sub=chris&roles=USER',
        {},
      )
      .subscribe((response) => {
        this.tokenStorage.setAccessToken(response.accessToken);
        this.router.navigateByUrl('/app/dashboard');
      });
  }
}
