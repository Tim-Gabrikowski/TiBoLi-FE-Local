import { Component, Input, OnInit } from '@angular/core';
import { IBook } from 'src/app/interfaces/book';
import { FormGroup, FormControl } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-book-edit',
	templateUrl: './book-edit.component.html',
	styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {
	constructor(private bookService: BookService, private router: Router) {}
	@Input() book?: IBook;

	ngOnInit(): void {
		var n = setInterval(() => {
			if (this.book) {
				clearInterval(n);
				this.setToDefault();
			}
		});
	}

	BookCredentials = new FormGroup({
		id: new FormControl(''),
		title: new FormControl(''),
		subtitle: new FormControl(''),
		isbn: new FormControl(''),
		author: new FormControl(''),
		publisher: new FormControl(''),
		year: new FormControl(''),
		age: new FormControl(''),
	});

	setToDefault() {
		this.BookCredentials.setValue({
			id: this.book!.id,
			title: this.book!.title,
			subtitle: this.book!.subtitle,
			author: this.book!.author,
			isbn: this.book!.isbn,
			publisher: this.book!.publisher,
			year: this.book!.year,
			age: this.book!.age,
		});
	}
	onSubmit() {
		this.book! = this.BookCredentials.value;
		this.bookService.updateBook(this.book!);
		this.router.navigate(['/books/' + this.book!.id + '/overview']);
	}
	deleteBook() {
		this.bookService.deleteBook(this.book!.id);
		this.router.navigate(['/books']);
	}
}
