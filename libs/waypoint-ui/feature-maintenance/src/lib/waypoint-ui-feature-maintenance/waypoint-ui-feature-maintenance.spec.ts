import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaypointUiFeatureMaintenance } from './waypoint-ui-feature-maintenance';

describe('WaypointUiFeatureMaintenance', () => {
  let component: WaypointUiFeatureMaintenance;
  let fixture: ComponentFixture<WaypointUiFeatureMaintenance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaypointUiFeatureMaintenance],
    }).compileComponents();

    fixture = TestBed.createComponent(WaypointUiFeatureMaintenance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
