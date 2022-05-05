import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, mergeMap, retryWhen, tap } from 'rxjs/operators';
import { ITransaction } from 'src/app/interfaces/transaction';
import { ITransactionBook } from 'src/app/interfaces/transactionBook';
import { MessageService } from 'src/app/message.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class TransactionsService {
	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) {}

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		}),
	};

	transactionsUrl: string = environment.apiUrl + '/transactions';

	getAll(): Observable<ITransaction[]> {
		this.log('transactions werden geladen!');
		return this.http
			.get<ITransaction[]>(this.transactionsUrl)
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<ITransaction[]>('get Books', []))
			);
	}
	newTransactions(bNumber: number, mNumbers: number[], callback: Function) {
		this.log('bücher ausleihen');

		mNumbers.forEach((num) => {
			var req = this.http
				.post(
					this.transactionsUrl + '/lent',
					{ bNumber: bNumber, mNumber: num },
					this.httpOptions
				)
				.pipe(
					this.delayRetry(1000, 3),
					tap((_) => this.log(`Buch leihen`)),
					catchError(this.handleError<any>('lentBook'))
				);
			req.subscribe((res) => {
				if (res.status == 0) {
					this.log('Buch ' + num + ' wurde ausgeliehen.');
				} else {
					this.log('Buch ' + num + ' konnte nicht geliehen werden');
				}
				callback(num, res.status);
			});
		});
	}
	finnishTransaction(mNumber: number, callback: Function) {
		var req = this.http
			.post(
				this.transactionsUrl + '/back',
				{ mNumber: mNumber },
				this.httpOptions
			)
			.pipe(
				this.delayRetry(1000, 3),
				tap((_) => this.log(`Buch zurrückgeben`)),
				catchError(this.handleError<any>('backBook'))
			);
		req.subscribe((res) => {
			if (res.status == 0) {
				this.log(
					'Buch ' + mNumber + ' ist jetzt nicht mehr ausgeliehen.'
				);
			}
			callback();
		});
	}
	getTransactionsFromCustomer(num: number): Observable<ITransaction[]> {
		return this.http
			.get<ITransaction[]>(this.transactionsUrl + '/customer/' + num)
			.pipe(
				this.delayRetry(1000, 3),
				catchError(
					this.handleError<ITransaction[]>(
						'get Transations from Customer',
						[]
					)
				)
			);
	}
	getTransactionsWithBookFromCustomer(
		num: number
	): Observable<ITransactionBook[]> {
		return this.http
			.get<ITransactionBook[]>(
				this.transactionsUrl + '/customer/' + num + '/books'
			)
			.pipe(
				this.delayRetry(1000, 3),
				catchError(
					this.handleError<ITransactionBook[]>(
						'get Transations from Customer',
						[]
					)
				)
			);
	}

	//error Handling
	private handleError<T>(operator = 'operator', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			this.log('something went wrong ' + error.message);
			return of(result as T);
		};
	}
	//log to MessageService
	log(message: string) {
		this.messageService.add(message);
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
