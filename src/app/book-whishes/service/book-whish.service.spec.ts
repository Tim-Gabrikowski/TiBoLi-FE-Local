import { TestBed } from '@angular/core/testing';

import { BookWhishService } from './book-whish.service';

describe('BookWhishService', () => {
  let service: BookWhishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookWhishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
