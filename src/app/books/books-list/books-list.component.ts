import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from 'src/app/interfaces/book';
import { MessageService } from 'src/app/message.service';
import { BookService } from '../services/book.service';

interface searchOption {
	id: number;
	description: string;
}

@Component({
	selector: 'app-books-list',
	templateUrl: './books-list.component.html',
	styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
	constructor(
		private bookService: BookService,
		private messageService: MessageService,
		private router: Router
	) {}

	books: IBook[] = [];
	filteredBooks: IBook[] = [];

	selectedBook?: IBook;
	searched: boolean = false;
	newEditor: boolean = false;

	searchOptions: searchOption[] = [
		{
			id: 0,
			description: 'Titel',
		},
		{
			id: 1,
			description: 'Autor',
		},
	];

	getBooks(): void {
		this.bookService.getBooks().subscribe((books) => {
			this.books = books;
			this.messageService.add('books loadet');
		});
	}

	ngOnInit(): void {
		this.getBooks();
	}

	onSelectBook(book: IBook): void {
		this.selectedBook = book;
		this.router.navigate([`/books/${this.selectedBook.id}`]);
	}
	searchBook(term: string) {
		this.filteredBooks = this.books.filter((book) =>
			this.filter(book, term)
		);
		this.searched = true;
	}
	filter(book: IBook, term: string) {
		var searchTitle = book.title.toLowerCase().replace(/ /g, '');
		var searchAuthor = book.author.toLowerCase().replace(/ /g, '');
		var searchTerm = term.toLowerCase().replace(/ /g, '');

		return (
			searchTitle.includes(searchTerm) ||
			searchAuthor.includes(searchTerm)
		);
	}
	undoSearch() {
		this.filteredBooks = [];
		this.searched = false;
	}
	backToHome() {
		this.router.navigate(['']);
	}

	toggleNewEditor() {
		this.newEditor = !this.newEditor;
	}
}
