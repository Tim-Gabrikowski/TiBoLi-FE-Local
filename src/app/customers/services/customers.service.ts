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
import { IClass } from 'src/app/interfaces/class';
import { ICustomer } from 'src/app/interfaces/customer';
import { MessageService } from 'src/app/message.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class CustomersService {
	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) {}
	private customersUrl = environment.apiUrl + '/customers';

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

	//Actions:
	getCustomers(): Observable<ICustomer[]> {
		return this.http
			.get<ICustomer[]>(this.customersUrl)
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<ICustomer[]>('get customers', []))
			);
	}
	getCustomer(id: number | Number): Observable<ICustomer[]> {
		return this.http
			.get<ICustomer[]>(this.customersUrl + '/' + id)
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<ICustomer[]>('get customer'))
			);
	}
	getCustomerWithClass(id: number | Number): Observable<ICustomer> {
		return this.http
			.get<ICustomer>(this.customersUrl + '/' + id + '/class')
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<ICustomer>('get customer'))
			);
	}
	editCustomer(customer: ICustomer) {
		this.log(' Nutzer wird gespeichert....');
		var req = this.http
			.put(this.customersUrl, customer, this.httpOptions)
			.pipe(
				this.delayRetry(1000, 3),
				tap((_) => this.log(`updated customer id = ${customer.id}`)),
				catchError(this.handleError<any>('updateCustomer'))
			);
		req.subscribe((result) => {
			this.log('Customer gespeichert');
		});
	}

	newCustomer(
		name: string | String,
		lastname: string | String,
		classId: number | Number,
		callback: Function
	): void {
		this.log('Nutzer wird gespeichert...');
		var req = this.http
			.put(
				this.customersUrl,
				{ name: name, lastname: lastname, classId: classId },
				this.httpOptions
			)
			.pipe(
				this.delayRetry(1000, 3),
				tap((_) => this.log(`Nutzer speichern`)),
				catchError(this.handleError<any>('updateCustomer'))
			);
		req.subscribe((result) => {
			callback(result);
			this.log('Nutzer gespeichert');
		});
	}
	deleteCustomer(id: number | Number) {
		this.log('Nutzer wird gelöscht...');
		var req = this.http.delete(this.customersUrl + '/' + id).pipe(
			this.delayRetry(1000, 3),
			tap((_) => this.log(`Nutzer löschen`)),
			catchError(this.handleError<any>('deleteCustomer'))
		);
		req.subscribe((result) => {
			this.log('Nutzer gelöscht');
		});
	}

	//Errorhandling & stuff:
	private handleError<T>(operator = 'operator', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			this.log('Bücher konnten nicht geladen werden ' + error.message);
			return of(result as T);
		};
	}
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
