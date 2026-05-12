import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaypointUiFeatureDocuments } from './waypoint-ui-feature-documents';

describe('WaypointUiFeatureDocuments', () => {
  let component: WaypointUiFeatureDocuments;
  let fixture: ComponentFixture<WaypointUiFeatureDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaypointUiFeatureDocuments],
    }).compileComponents();

    fixture = TestBed.createComponent(WaypointUiFeatureDocuments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
