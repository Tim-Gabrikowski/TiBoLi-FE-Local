import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from 'src/app/interfaces/book';

@Component({
	selector: 'app-book-list-item',
	templateUrl: './book-list-item.component.html',
	styleUrls: ['./book-list-item.component.css'],
})
export class BookListItemComponent implements OnInit {
	constructor(private router: Router) {}

	@Input() book?: IBook;
	selectedBook?: IBook;

	ngOnInit(): void {}
	onSelectBook(book: IBook): void {
		this.selectedBook = book;
		this.router.navigate([`/books/${this.selectedBook.id}`]);
	}
}
