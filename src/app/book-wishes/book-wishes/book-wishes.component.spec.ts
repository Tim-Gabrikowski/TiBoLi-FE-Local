import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookWishesComponent } from './book-wishes.component';

describe('BookWishesComponent', () => {
	let component: BookWishesComponent;
	let fixture: ComponentFixture<BookWishesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BookWishesComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BookWishesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
