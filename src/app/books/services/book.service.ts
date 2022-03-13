import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
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

@Injectable({
	providedIn: 'root',
})
export class BookService {
	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) {}

	private booksUrl = 'api/books';
	private copiesUrl = 'api/copies';
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
			console.error(error);
			this.log('failed loading books: ' + error.message);
			return of(result as T);
		};
	}
	getBooks(): Observable<IBook[]> {
		this.log('start loading books');

		return this.http
			.get<IBook[]>(this.booksUrl)
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<IBook[]>('get Books', []))
			);
	}
	getBook(id: Number): Observable<IBook[]> {
		return this.http

			.get<IBook[]>(this.booksUrl + '/' + id)
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<IBook[]>('get Books'))
			);
	}
	getBookWithCopies(id: Number): Observable<IBook> {
		return this.http
			.get<IBook>(this.booksUrl + '/' + id + '/copies')
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<IBook>('get Books with copy'))
			);
	}
	updateBook(book: IBook): void {
		this.log('save book');
		var req = this.http.put(this.booksUrl, book, this.httpOptions).pipe(
			this.delayRetry(1000, 3),
			tap((_) => this.log(`updated book id=${book.id}`)),
			catchError(this.handleError<any>('updateBook'))
		);
		req.subscribe((result) => {
			this.log('saved book');
		});
	}
	newBook(
		title: string | String,
		author: string | String,
		callback: Function
	): void {
		this.log('save book');
		var req = this.http
			.put(
				this.booksUrl,
				{ title: title, author: author },
				this.httpOptions
			)
			.pipe(
				this.delayRetry(1000, 3),
				tap((_) => this.log(`create Book`)),
				catchError(this.handleError<any>('updateBook'))
			);
		req.subscribe((result) => {
			callback(result.insertId);
		});
	}
	createCopy(bookId: Number): Observable<ICopy> {
		return this.http
			.post<ICopy>(this.copiesUrl, { bookId: bookId }, this.httpOptions)
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<ICopy>('create new copy'))
			);
	}
	searchBookByTerm(term: string): Observable<IBook[]> {
		return this.http
			.get<IBook[]>(this.booksUrl + '/search/' + term)
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<IBook[]>('get Books', []))
			);
	}
	deleteCopy(mNumber: number | Number) {
		var req = this.http
			.put(
				this.copiesUrl,
				{ mNumber: mNumber, lifecycle: 5 },
				this.httpOptions
			)
			.pipe(
				this.delayRetry(1000, 3),
				tap((_) => this.log(`delete Copy Book`)),
				catchError(this.handleError<any>('deleteCopy'))
			);
		req.subscribe((result) => {
			this.log('Exemplar gelöscht');
		});
	}
	deleteBook(id: number | Number) {
		var req = this.http.delete(this.booksUrl + '/' + id).pipe(
			this.delayRetry(1000, 3),
			tap((_) => this.log(`delete Book`)),
			catchError(this.handleError<any>('deleteBook'))
		);
		req.subscribe((result) => {
			this.log('Buch gelöscht');
		});
	}

	//some magic to retry actions:
	delayRetry(delayMS: number, maxRetry: number) {
		let retries = maxRetry;
		return (src: Observable<any>) =>
			src.pipe(
				retryWhen((errors: Observable<any>) =>
					errors.pipe(
						delay(delayMS),
						mergeMap((error) =>
							retries-- > 0
								? of(error)
								: throwError({
										message:
											'Server hat auf ' +
											(maxRetry + 1) +
											' Nachrichten nicht geantwortet. Bitte versuche es später nochmal',
								  })
						)
					)
				)
			);
	}
}
