import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhishFormComponent } from './whish-form.component';

describe('WhishFormComponent', () => {
  let component: WhishFormComponent;
  let fixture: ComponentFixture<WhishFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhishFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
