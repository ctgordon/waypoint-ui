import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AircraftListPage } from './aircraft-list-page.component';

describe('AircraftListPage', () => {
  let component: AircraftListPage;
  let fixture: ComponentFixture<AircraftListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AircraftListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AircraftListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
