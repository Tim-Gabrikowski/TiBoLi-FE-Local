import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from 'src/app/interfaces/book';
import { ICopy } from 'src/app/interfaces/copy';
import { BookService } from '../../services/book.service';

@Component({
	selector: 'app-new-book-editor',
	templateUrl: './new-book-editor.component.html',
	styleUrls: ['./new-book-editor.component.css'],
})
export class NewBookEditorComponent implements OnInit {
	constructor(private bookService: BookService, private router: Router) {}

	booksFoundByTitle: IBook[] = [];
	booksFoundByAuthor: IBook[] = [];
	newCopys: ICopy[] = [];
	bookCreated: boolean = false;
	newBookID: Number = 0;

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
			this.newBookID = id;
		});
	}
	setNewBook(id: number | Number) {
		this.bookCreated = true;
		this.newBookID = id;
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
}
