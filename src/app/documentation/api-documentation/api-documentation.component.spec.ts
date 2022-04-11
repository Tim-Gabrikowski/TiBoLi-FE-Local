import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APIDocumentationComponent } from './api-documentation.component';

describe('APIDocumentationComponent', () => {
  let component: APIDocumentationComponent;
  let fixture: ComponentFixture<APIDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ APIDocumentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(APIDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
