import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';

import { DefectsApiService } from '@waypoint-ui/shared-data-access';

import { DefectsPageComponent } from './defects-page.component';

describe('DefectsPage', () => {
  let component: DefectsPageComponent;
  let fixture: ComponentFixture<DefectsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefectsPageComponent],
      providers: [
        {
          provide: DefectsApiService,
          useValue: {
            listFleetDefects: vi.fn(() => of([])),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({}),
            },
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DefectsPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
