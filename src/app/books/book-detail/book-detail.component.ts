import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { IBook } from 'src/app/interfaces/book';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

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
		private location: Location
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	bookId?: Number;
	page: string = 'overview';
	pageIndex: number = 0;

	tabs: string[] = ['overview', 'copies', 'edit'];
	@ViewChild('tabGroup', { static: false }) tabGroup?: MatTabGroup;

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.bookId = Number(params.id);
			this.getBook(this.bookId);

			if (params.page) this.page = params.page;
			var index = this.tabs.indexOf(this.page);
			console.log(params.page, index);
			this.pageIndex = index;
		});
	}
	interval = setInterval(() => {
		if (typeof this.tabGroup === 'undefined') return;

		clearInterval(this.interval);

		this.selectTab(this.pageIndex);
	}, 10);
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
	selectTab(index: number) {
		this.setPageUrl(index);
		const tabGroup = this.tabGroup;
		if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;

		console.log(index, tabGroup);
		tabGroup.selectedIndex = index;
	}
	setPageUrl(index: number) {
		this.location.go('/books/' + this.bookId! + '/' + this.tabs[index]);
	}
	selectedTabChange(event: MatTabChangeEvent) {
		this.setPageUrl(event.index);
	}
}
