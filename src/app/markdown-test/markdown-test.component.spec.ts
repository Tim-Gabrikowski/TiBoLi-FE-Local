import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownTestComponent } from './markdown-test.component';

describe('MarkdownTestComponent', () => {
  let component: MarkdownTestComponent;
  let fixture: ComponentFixture<MarkdownTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkdownTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
