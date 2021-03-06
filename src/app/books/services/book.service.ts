import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
	catchError,
	delay,
	map,
	mergeMap,
	retry,
	retryWhen,
	tap,
} from 'rxjs/operators';
import { IBook } from 'src/app/interfaces/book';
import { ICopy } from 'src/app/interfaces/copy';
import { MessageService } from 'src/app/message.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class BookService {
	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) {}

	private booksUrl = environment.apiUrl + '/books';
	private copiesUrl = environment.apiUrl + '/copies';

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		}),
	};

	//log to MessageService
	log(message: string) {
		this.messageService.add(message);
	}

	private handleError<T>(operator = 'operator', result?: T) {
		return (error: any): Observable<T> => {
			if (error.status == 401 || error.status == 403) {
				this.messageService.add('Fehler! Kein Zugriff');
			} else {
				this.log('Ein Fehler ist aufgetreten ' + error.message);
			}

			return of(result as T);
		};
	}
	getBooks(): Observable<IBook[]> {
		this.log('Bücher werden geladen');

		return this.http
			.get<IBook[]>(this.booksUrl)
			.pipe(catchError(this.handleError<IBook[]>('get Books', [])));
	}
	getBook(id: Number): Observable<IBook[]> {
		return this.http
			.get<IBook[]>(this.booksUrl + '/' + id)
			.pipe(catchError(this.handleError<IBook[]>('get Books')));
	}
	getBookWithCopies(id: Number): Observable<IBook> {
		return this.http
			.get<IBook>(this.booksUrl + '/' + id + '/copies')
			.pipe(catchError(this.handleError<IBook>('get Books with copy')));
	}
	updateBook(book: IBook): void {
		this.log(' Buch wird gespeichert....');
		var req = this.http
			.put(this.booksUrl, book, this.httpOptions)
			.pipe(catchError(this.handleError<any>('updateBook')));

		req.subscribe((result) => {
			this.log('Buch gespeichert');
		});
	}
	newBook(book: any, callback: Function): void {
		this.log('Buch wird gespeichert...');
		var req = this.http
			.put(this.booksUrl, book, this.httpOptions)
			.pipe(catchError(this.handleError<any>('updateBook')));

		req.subscribe((result) => {
			callback(result.id);
			this.log('Buch gespeichert');
		});
	}
	createCopies(bookId: Number, amount: Number | number): Observable<ICopy[]> {
		return this.http
			.post<ICopy[]>(
				this.copiesUrl,
				{ bookId: bookId, amount: amount },
				this.httpOptions
			)
			.pipe(catchError(this.handleError<ICopy[]>('create new copy')));
	}
	searchBookByTitle(term: string): Observable<IBook[]> {
		return this.http
			.get<IBook[]>(this.booksUrl + '/search/title/' + term)
			.pipe(catchError(this.handleError<IBook[]>('get Books', [])));
	}
	searchBookByAuthor(term: string): Observable<IBook[]> {
		return this.http
			.get<IBook[]>(this.booksUrl + '/search/author/' + term)
			.pipe(catchError(this.handleError<IBook[]>('get Books', [])));
	}
	deleteCopy(mNumber: number | Number) {
		var req = this.http
			.put(
				this.copiesUrl,
				{ mNumber: mNumber, lifecycle: 5 },
				this.httpOptions
			)
			.pipe(catchError(this.handleError<any>('deleteCopy')));

		req.subscribe((result) => {
			this.log('Exemplar gelöscht');
		});
	}
	deleteBook(id: number | Number) {
		var req = this.http
			.delete(this.booksUrl + '/' + id)
			.pipe(catchError(this.handleError<any>('deleteBook')));

		req.subscribe((result) => {
			this.log('Buch gelöscht');
		});
	}
	getIsbnData(isbn: string) {
		var url = this.booksUrl + '/isbn/' + isbn;
		return this.http
			.get(url, this.httpOptions)
			.pipe(catchError(this.handleError<any>('deleteBook')));
	}
}
