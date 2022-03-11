import { Component, Input, OnInit } from '@angular/core';
import { IBook } from 'src/app/interfaces/book';

@Component({
	selector: 'app-book-copies',
	templateUrl: './book-copies.component.html',
	styleUrls: ['./book-copies.component.css'],
})
export class BookCopiesComponent implements OnInit {
	constructor() {}

	@Input() book?: IBook;

	ngOnInit(): void {}
}
