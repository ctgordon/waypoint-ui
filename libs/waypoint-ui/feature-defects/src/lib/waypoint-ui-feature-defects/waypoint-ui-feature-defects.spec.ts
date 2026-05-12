import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaypointUiFeatureDefects } from './waypoint-ui-feature-defects';

describe('WaypointUiFeatureDefects', () => {
  let component: WaypointUiFeatureDefects;
  let fixture: ComponentFixture<WaypointUiFeatureDefects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaypointUiFeatureDefects],
    }).compileComponents();

    fixture = TestBed.createComponent(WaypointUiFeatureDefects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
