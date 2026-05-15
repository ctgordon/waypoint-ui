import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

import {
  AccountApiService,
  toApiViewState,
} from '@waypoint-ui/shared-data-access';
import {
  ErrorStateComponent,
  LoadingStateComponent,
  PageHeaderComponent,
  SectionPanelComponent,
} from '@waypoint-ui/shared-ui';

@Component({
  selector: 'wp-account-page',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    ErrorStateComponent,
    LoadingStateComponent,
    PageHeaderComponent,
    SectionPanelComponent,
  ],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss',
})
export class AccountPageComponent {
  private readonly accountApi = inject(AccountApiService);

  readonly viewState$ = toApiViewState(this.accountApi.getMe());
}
