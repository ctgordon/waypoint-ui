import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AircraftMaintenancePanel } from './aircraft-maintenance-panel.component';

describe('AircraftMaintenancePanel', () => {
  let component: AircraftMaintenancePanel;
  let fixture: ComponentFixture<AircraftMaintenancePanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AircraftMaintenancePanel],
    }).compileComponents();

    fixture = TestBed.createComponent(AircraftMaintenancePanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
