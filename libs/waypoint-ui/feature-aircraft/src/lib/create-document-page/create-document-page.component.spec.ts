import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDocumentPage } from './create-document-page.component';

describe('CreateDocumentPage', () => {
  let component: CreateDocumentPage;
  let fixture: ComponentFixture<CreateDocumentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDocumentPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDocumentPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
