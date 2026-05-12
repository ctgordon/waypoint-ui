import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaypointUiFeatureCompliance } from './waypoint-ui-feature-compliance';

describe('WaypointUiFeatureCompliance', () => {
  let component: WaypointUiFeatureCompliance;
  let fixture: ComponentFixture<WaypointUiFeatureCompliance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaypointUiFeatureCompliance],
    }).compileComponents();

    fixture = TestBed.createComponent(WaypointUiFeatureCompliance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
