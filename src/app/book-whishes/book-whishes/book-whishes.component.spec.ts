import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookWhishesComponent } from './book-whishes.component';

describe('BookWhishesComponent', () => {
  let component: BookWhishesComponent;
  let fixture: ComponentFixture<BookWhishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookWhishesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookWhishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
