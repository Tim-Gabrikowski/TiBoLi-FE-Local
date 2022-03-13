import { Component, Input, OnInit } from '@angular/core';
import { IBook } from 'src/app/interfaces/book';
import { BookService } from '../../services/book.service';

@Component({
	selector: 'app-book-copies',
	templateUrl: './book-copies.component.html',
	styleUrls: ['./book-copies.component.css'],
})
export class BookCopiesComponent implements OnInit {
	constructor(private bookService: BookService) {}

	@Input() book?: IBook;
	newCopy: boolean = false;
	ngOnInit(): void {}
	createCopy() {
		this.newCopy = true;
		this.bookService.createCopy(this.book!.id).subscribe((copy) => {
			this.book!.copies!.push(copy);
			this.newCopy = false;
		});
	}
	deleteCopy(mNumber: number | Number) {
		this.bookService.deleteCopy(mNumber);
		var index: number | undefined = this.book!.copies?.findIndex(
			(item) => item.mNumber === mNumber
		);
		if (!(index === undefined)) {
			this.book!.copies![index].lifecycle = 5;
		}
		this.book!.copies = this.book!.copies?.filter(
			(copy) => copy.lifecycle != 5
		);
	}
}
