import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplianceBanner } from './compliance-banner.component';

describe('ComplianceBanner', () => {
  let component: ComplianceBanner;
  let fixture: ComponentFixture<ComplianceBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplianceBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplianceBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
