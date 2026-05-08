import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaypointUiFeatureAircraft } from './waypoint-ui-feature-aircraft';

describe('WaypointUiFeatureAircraft', () => {
  let component: WaypointUiFeatureAircraft;
  let fixture: ComponentFixture<WaypointUiFeatureAircraft>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaypointUiFeatureAircraft],
    }).compileComponents();

    fixture = TestBed.createComponent(WaypointUiFeatureAircraft);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
