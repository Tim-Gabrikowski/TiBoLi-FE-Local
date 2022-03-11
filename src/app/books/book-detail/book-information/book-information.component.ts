import { Component, Input, OnInit } from '@angular/core';
import { IBook } from 'src/app/interfaces/book';

@Component({
	selector: 'app-book-information',
	templateUrl: './book-information.component.html',
	styleUrls: ['./book-information.component.css'],
})
export class BookInformationComponent implements OnInit {
	constructor() {}

	@Input() book?: IBook;
	ngOnInit(): void {}
}
