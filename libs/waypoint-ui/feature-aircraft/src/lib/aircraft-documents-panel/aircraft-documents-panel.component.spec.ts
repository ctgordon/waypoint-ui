import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AircraftDocumentsPanel } from './aircraft-documents-panel.component';

describe('AircraftDocumentsPanel', () => {
  let component: AircraftDocumentsPanel;
  let fixture: ComponentFixture<AircraftDocumentsPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AircraftDocumentsPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(AircraftDocumentsPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
