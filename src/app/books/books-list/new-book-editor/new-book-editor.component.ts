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
	getPdfOfBooks() {
		var body = {
			startAt: 0,
			books: [{}],
		};

		var books = [{}];
		this.newCopys.forEach((element) => {
			var book = {
				title: this.newBookTitle!,
				author: this.newBookAuthor!,
				mNumber: element.mNumber,
			};
			books.push(book);
		});

		body.books = books;
		body.books.shift();
		console.log(body);
		this.loadLables = true;
		this.pdfService.downloadPDF(body, () => {
			this.loadLables = false;
		});
	}
	defaultLabelPosition = 0;
	labelPositions = [
		{
			position: 0,
			label: '1:1',
		},
	];
}
