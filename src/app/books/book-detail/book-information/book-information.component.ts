import { Component, Input, OnInit } from '@angular/core';
import { IBook } from 'src/app/interfaces/book';
import { BookDetailComponent } from '../book-detail.component';

@Component({
	selector: 'app-book-information',
	templateUrl: './book-information.component.html',
	styleUrls: ['./book-information.component.css'],
})
export class BookInformationComponent implements OnInit {
	constructor(private bookDetail: BookDetailComponent) {}

	@Input() book?: IBook;
	ngOnInit(): void {}

	onClick() {
		this.bookDetail.selectTab(1);
	}
}
