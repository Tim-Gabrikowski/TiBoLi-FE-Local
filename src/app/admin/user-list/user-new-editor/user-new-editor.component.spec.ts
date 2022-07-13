import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewEditorComponent } from './user-new-editor.component';

describe('UserNewEditorComponent', () => {
  let component: UserNewEditorComponent;
  let fixture: ComponentFixture<UserNewEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNewEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNewEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
