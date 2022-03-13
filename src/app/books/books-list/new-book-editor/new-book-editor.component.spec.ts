import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookEditorComponent } from './new-book-editor.component';

describe('NewBookEditorComponent', () => {
  let component: NewBookEditorComponent;
  let fixture: ComponentFixture<NewBookEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBookEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBookEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
