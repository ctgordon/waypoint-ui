import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AircraftDetailPage } from './aircraft-detail-page.component';

describe('AircraftDetailPage', () => {
  let component: AircraftDetailPage;
  let fixture: ComponentFixture<AircraftDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AircraftDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AircraftDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
