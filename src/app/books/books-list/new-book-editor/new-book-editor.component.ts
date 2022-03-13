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

	booksFound: IBook[] = [];
	newCopy?: ICopy;

	ngOnInit(): void {}

	searchBooks(title: string) {
		this.bookService.searchBookByTerm(title).subscribe((books) => {
			this.booksFound = books;
		});
	}
	createCopy(id: number | Number) {
		this.bookService.createCopy(id).subscribe((copy) => {
			this.newCopy = copy;
		});
	}
	newBook(title: string, author: string) {
		this.bookService.newBook(title, author, (id: Number) => {
			this.bookService.createCopy(id).subscribe((copy) => {
				this.newCopy = copy;
			});
		});
	}
	reloadBookList() {
		this.router.navigate(['/books/' + this.newCopy!.bookId]);
	}
}
