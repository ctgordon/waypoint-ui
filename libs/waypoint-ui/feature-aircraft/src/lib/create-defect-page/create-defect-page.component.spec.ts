import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDefectPage } from './create-defect-page.component';

describe('CreateDefectPage', () => {
  let component: CreateDefectPage;
  let fixture: ComponentFixture<CreateDefectPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDefectPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDefectPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
