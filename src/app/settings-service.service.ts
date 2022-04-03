import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, mergeMap, retryWhen, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
	providedIn: 'root',
})
export class SettingsServiceService {
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

	settingsUrl: string = 'api/settings';

	checkLogin(login: string, callback: Function) {
		var req = this.http
			.post(
				this.settingsUrl + '/login',
				{ password: login },
				this.httpOptions
			)
			.pipe(
				this.delayRetry(1000, 3),
				tap((_) => this.log(`Login...`)),
				catchError(this.handleError<any>('login'))
			);
		req.subscribe((res) => {
			if (res.ok) {
				callback(1);
			} else {
				callback(0);
			}
		});
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
