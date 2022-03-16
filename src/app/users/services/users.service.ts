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
import { IUser } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/message.service';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) {}
	private usersUrl = 'api/users';

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
	getUsers(): Observable<IUser[]> {
		this.log('Nutzer werden geladen');

		return this.http
			.get<IUser[]>(this.usersUrl)
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<IUser[]>('get users', []))
			);
	}
	getUser(bNumber: number | Number): Observable<IUser> {
		return this.http
			.get<IUser>(this.usersUrl)
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<IUser>('get user'))
			);
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
