import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaypointUiFeatureAccount } from './waypoint-ui-feature-account';

describe('WaypointUiFeatureAccount', () => {
  let component: WaypointUiFeatureAccount;
  let fixture: ComponentFixture<WaypointUiFeatureAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaypointUiFeatureAccount],
    }).compileComponents();

    fixture = TestBed.createComponent(WaypointUiFeatureAccount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
