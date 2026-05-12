import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefectsPage } from './defects-page.component';

describe('DefectsPage', () => {
  let component: DefectsPage;
  let fixture: ComponentFixture<DefectsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefectsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DefectsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
