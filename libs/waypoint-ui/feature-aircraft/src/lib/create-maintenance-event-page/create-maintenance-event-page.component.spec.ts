import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMaintenanceEventPage } from './create-maintenance-event-page.component';

describe('CreateMaintenanceEventPage', () => {
  let component: CreateMaintenanceEventPage;
  let fixture: ComponentFixture<CreateMaintenanceEventPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMaintenanceEventPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMaintenanceEventPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
