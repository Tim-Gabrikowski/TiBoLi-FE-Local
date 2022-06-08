import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from 'src/app/interfaces/book';
import { ICopy } from 'src/app/interfaces/copy';
import { PdfService } from 'src/app/pdf.service';
import { BookService } from '../../services/book.service';

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

	booksFoundByTitle: IBook[] = [];
	booksFoundByAuthor: IBook[] = [];
	newCopys: ICopy[] = [];
	bookCreated: boolean = false;
	newBookID?: Number;

	newBookTitle?: string;
	newBookAuthor?: string;

	loadLables = false;

	ngOnInit(): void {}

	searchBooks(title: string, author: string) {
		this.searchBooksByTitle(title);
		this.searchBooksByAuthor(author);
	}
	searchBooksByTitle(title: string) {
		this.bookService.searchBookByTitle(title).subscribe((books) => {
			this.booksFoundByTitle = books;
		});
	}
	searchBooksByAuthor(title: string) {
		this.bookService.searchBookByAuthor(title).subscribe((books) => {
			this.booksFoundByAuthor = books;
		});
	}

	newBook(title: string, author: string) {
		this.bookService.newBook(title, author, (id: Number) => {
			this.bookCreated = true;
			console.log(id);
			this.setNewBook(title, author, id);
			console.log(this.newBookID);
		});
	}
	setNewBook(title: string, author: string, id: number | Number) {
		this.bookCreated = true;

		this.newBookTitle! = title;
		this.newBookAuthor! = author;
		this.newBookID! = id;
	}
	newCopysToBook(bookID: Number | number, InAmount: string) {
		var amount: number = Number(InAmount);
		this.bookService.createCopies(bookID, amount).subscribe((copies) => {
			this.newCopys = copies;
		});
	}
	reloadBookList() {
		this.router.navigate(['/books/' + this.newBookID]);
	}
	getPdfOfBooks(startAt: string) {
		var body = {
			startAt: Number(startAt),
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
		this.loadLables = true;
		this.pdfService.downloadBookPDF(body, () => {
			this.loadLables = false;
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
