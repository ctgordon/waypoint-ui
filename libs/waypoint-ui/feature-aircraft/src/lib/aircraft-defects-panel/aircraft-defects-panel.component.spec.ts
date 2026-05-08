import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AircraftDefectsPanel } from './aircraft-defects-panel.component';

describe('AircraftDefectsPanel', () => {
  let component: AircraftDefectsPanel;
  let fixture: ComponentFixture<AircraftDefectsPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AircraftDefectsPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(AircraftDefectsPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
