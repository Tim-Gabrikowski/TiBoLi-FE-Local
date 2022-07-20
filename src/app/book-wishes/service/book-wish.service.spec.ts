import { TestBed } from '@angular/core/testing';

import { BookWishService } from './book-wish.service';

describe('BookWishService', () => {
	let service: BookWishService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(BookWishService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
