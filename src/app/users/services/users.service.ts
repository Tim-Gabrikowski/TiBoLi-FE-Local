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
		return this.http
			.get<IUser[]>(this.usersUrl)
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<IUser[]>('get users', []))
			);
	}
	getUser(id: number | Number): Observable<IUser[]> {
		return this.http
			.get<IUser[]>(this.usersUrl + '/' + id)
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<IUser[]>('get user'))
			);
	}
	getUserWithClass(id: number | Number): Observable<IUser> {
		return this.http
			.get<IUser>(this.usersUrl + '/' + id + '/class')
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<IUser>('get user'))
			);
	}
	editUser(user: IUser) {
		this.log(' Nutzer wird gespeichert....');
		var req = this.http.put(this.usersUrl, user, this.httpOptions).pipe(
			this.delayRetry(1000, 3),
			tap((_) => this.log(`updated user id = ${user.id}`)),
			catchError(this.handleError<any>('updateUser'))
		);
		req.subscribe((result) => {
			this.log('User gespeichert');
		});
	}
	getClasses(): Observable<IClass[]> {
		return this.http
			.get<IClass[]>(this.usersUrl + '/classes')
			.pipe(
				this.delayRetry(1000, 3),
				catchError(this.handleError<IClass[]>('get user'))
			);
	}
	newUser(
		vorname: string | String,
		nachname: string | String,
		classId: number | Number,
		callback: Function
	): void {
		this.log('Nutzer wird gespeichert...');
		var req = this.http
			.put(
				this.usersUrl,
				{ vorname: vorname, nachname: nachname, classId: classId },
				this.httpOptions
			)
			.pipe(
				this.delayRetry(1000, 3),
				tap((_) => this.log(`Nutzer speichern`)),
				catchError(this.handleError<any>('updateUser'))
			);
		req.subscribe((result) => {
			callback(result);
			this.log('Nutzer gespeichert');
		});
	}
	deleteUser(id: number | Number) {
		this.log('Nutzer wird gelöscht...');
		var req = this.http.delete(this.usersUrl + '/' + id).pipe(
			this.delayRetry(1000, 3),
			tap((_) => this.log(`Nutzer löschen`)),
			catchError(this.handleError<any>('deleteUser'))
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
