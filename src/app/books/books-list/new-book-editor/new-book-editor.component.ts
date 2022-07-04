import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from 'src/app/interfaces/book';
import { ICopy } from 'src/app/interfaces/copy';
import { PdfService } from 'src/app/pdf.service';
import { BookService } from '../../services/book.service';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-new-book-editor',
	templateUrl: './new-book-editor.component.html',
	styleUrls: ['./new-book-editor.component.css'],
})
export class NewBookEditorComponent implements OnInit {
	constructor(
		private bookService: BookService,
		private router: Router,
		private pdfService: PdfService
	) {}

	//new:

	loadingStuff: boolean = false;

	isbnInputControl = new FormControl('');
	BookCredentials = new FormGroup({
		isbn: this.isbnInputControl,
		title: new FormControl(''),
		subtitle: new FormControl(''),
		author: new FormControl(''),
		publisher: new FormControl(''),
		year: new FormControl(''),
		age: new FormControl(''),
	});
	copyAmountInput = new FormControl('');
	labelPositionInput = new FormControl('');

	test() {
		console.log(this.BookCredentials.value.isbn);
		console.log(this.isbnInputControl.value);
	}
	searchISBN() {
		var isbn = this.isbnInputControl.value;
		this.loadingStuff = true;
		console.log('get isbn data');
		this.bookService.getIsbnData(isbn).subscribe((data: any) => {
			console.log(data);
			this.loadingStuff = false;
			this.BookCredentials.patchValue({
				title: data.title || '',
				subtitle: data.subtitle || '',
				author: data.authors[0].name || '',
				publisher: data.publishers[0].name || '',
				year: data.publish_date || '',
			});
		});
	}
	saveCredentials() {
		var credentials = this.BookCredentials.value;
	}

	//old:
	booksFoundByTitle: IBook[] = [];
	booksFoundByAuthor: IBook[] = [];
	newCopys: ICopy[] = [];
	bookCreated: boolean = false;
	newBookID?: Number;

	newBookTitle?: string;
	newBookAuthor?: string;

	loadLables = false;

	ngOnInit(): void {}

	searchBooks() {
		this.searchBooksByTitle(this.BookCredentials.value.title);
		// this.searchBooksByAuthor(this.BookCredentials.value.author);
	}
	searchBooksByTitle(title: string) {
		this.loadingStuff = true;
		this.bookService.searchBookByTitle(title).subscribe((books) => {
			this.booksFoundByTitle = books;
			this.loadingStuff = false;
		});
	}
	searchBooksByAuthor(title: string) {
		this.bookService.searchBookByAuthor(title).subscribe((books) => {
			this.booksFoundByAuthor = books;
		});
	}

	newBook() {
		this.loadingStuff = true;
		this.bookService.newBook(this.BookCredentials.value, (id: Number) => {
			this.bookCreated = true;
			console.log(id);
			this.setNewBook(id);
			console.log(this.newBookID);
			this.loadingStuff = false;
		});
	}
	setNewBook(id: number | Number) {
		this.bookCreated = true;

		this.newBookTitle! = this.BookCredentials.value.title;
		this.newBookAuthor! = this.BookCredentials.value.author;
		this.newBookID! = id;
	}
	newCopysToBook() {
		var amount: number = Number(this.copyAmountInput.value);
		this.loadingStuff = true;
		this.bookService
			.createCopies(this.newBookID!, amount)
			.subscribe((copies) => {
				this.newCopys = copies;
				this.loadingStuff = false;
			});
	}
	reloadBookList() {
		this.router.navigate(['/books/' + this.newBookID]);
	}
	getPdfOfBooks() {
		var body = {
			startAt: Number(this.labelPositionInput.value) || 0,
			books: [{}],
		};

		var books = [{}];
		this.newCopys.forEach((element) => {
			var book = {
				title: this.newBookTitle!,
				author: this.newBookAuthor!,
				mNumber: element.id,
			};
			books.push(book);
		});

		body.books = books;
		body.books.shift();
		console.log(body);
		this.loadingStuff = true;
		this.pdfService.downloadBookPDF(body, () => {
			this.loadingStuff = false;
		});
	}
	defaultLabelPosition = 0;
	labelPositions = [
		{
			position: 0,
			label: '1:1',
		},
		{
			position: 1,
			label: '1:2',
		},
		{
			position: 2,
			label: '1:3',
		},
		{
			position: 3,
			label: '2:1',
		},
		{
			position: 4,
			label: '2:2',
		},
		{
			position: 5,
			label: '2:3',
		},
		{
			position: 6,
			label: '3:1',
		},
		{
			position: 7,
			label: '3:2',
		},
		{
			position: 8,
			label: '3:3',
		},
		{
			position: 9,
			label: '4:1',
		},
		{
			position: 10,
			label: '4:2',
		},
		{
			position: 11,
			label: '4:3',
		},
		{
			position: 12,
			label: '5:1',
		},
		{
			position: 13,
			label: '5:2',
		},
		{
			position: 14,
			label: '5:3',
		},
		{
			position: 15,
			label: '6:1',
		},
		{
			position: 16,
			label: '6:2',
		},
		{
			position: 17,
			label: '6:3',
		},
		{
			position: 18,
			label: '7:1',
		},
		{
			position: 19,
			label: '7:2',
		},
		{
			position: 20,
			label: '7:3',
		},
	];
}
