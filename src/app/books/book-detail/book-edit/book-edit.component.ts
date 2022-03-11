import { Component, Input, OnInit } from '@angular/core';
import { IBook } from 'src/app/interfaces/book';
import { FormGroup, FormControl } from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
	selector: 'app-book-edit',
	templateUrl: './book-edit.component.html',
	styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {
	constructor(private bookService: BookService) {}
	@Input() book?: IBook;

	ngOnInit(): void {}

	onSubmit(title: string, author: string) {
		this.book!.title = title;
		this.book!.author = author;
		this.bookService.updateBook(this.book!);
	}
}
