import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IBook } from 'src/app/interfaces/book';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-book-detail',
	templateUrl: './book-detail.component.html',
	styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
	constructor(
		private bookService: BookService,
		private route: ActivatedRoute,
		private router: Router,
		private changeDetectorRef: ChangeDetectorRef
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	bookId?: Number;

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.bookId = Number(params.id);
			this.getBook(this.bookId);
		});
	}

	book?: IBook;

	getBook(id: Number): void {
		this.bookService.getBookWithCopies(id).subscribe((book) => {
			this.book = book;
			console.log(book);
		});
	}

	public updateTitle(title: string) {
		this.book!.title = title;
	}
	public saveBook(title: string, author: string) {
		if (!(this.book === undefined)) {
			var nBook: IBook = this.book!;

			nBook.title = title;
			nBook.author = author;

			this.bookService.updateBook(nBook);
		}
	}
	backToList() {
		this.router.navigate(['books']);
	}
}
