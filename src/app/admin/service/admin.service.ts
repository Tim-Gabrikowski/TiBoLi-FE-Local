import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IBook } from 'src/app/interfaces/book';
import { IUser } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/message.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AdminService {
	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) {}

	private adminUrl = environment.apiUrl + '/admin';
	private authUrl = environment.apiUrl + '/auth';

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
			} else if (error.status == 406) {
				switch (error.error.message) {
					case 'Username taken':
						this.log('Nutzername nicht verfügbar');
						break;
					default:
						this.log('Diese Aktion ist nicht zulässig');
				}
			} else {
				this.log('Ein unbekanter Fehler ist aufgetreten');
			}

			return of(result as T);
		};
	}
	// getBooks(): Observable<IBook[]> {
	// 	this.log('Bücher werden geladen');

	// 	return this.http
	// 		.get<IBook[]>(this.booksUrl)
	// 		.pipe(catchError(this.handleError<IBook[]>('get Books', [])));
	// }
	getUsers(): Observable<IUser[]> {
		return this.http
			.get<IUser[]>(this.authUrl + '/users')
			.pipe(catchError(this.handleError<IUser[]>('getUsers')));
	}
	getUser(id: number): Observable<IUser> {
		return this.http
			.get<IUser>(this.authUrl + '/user/' + id)
			.pipe(catchError(this.handleError<IUser>('getUser')));
	}
	updateUsername(id: number, newName: string): Observable<IUser> {
		return this.http
			.put<IUser>(
				this.authUrl + '/updateUsername',
				{ id: id, username: newName },
				this.httpOptions
			)
			.pipe(catchError(this.handleError<IUser>('updateUsername')));
	}
	updatePermission(id: number, permission: number): Observable<IUser> {
		return this.http
			.put<IUser>(
				this.authUrl + '/updatePermission',
				{
					id: id,
					permission: permission,
				},
				this.httpOptions
			)
			.pipe(catchError(this.handleError<IUser>('updatePermission')));
	}
	getRandomPassword() {
		return this.http
			.get(this.authUrl + '/randompassword', this.httpOptions)
			.pipe(catchError(this.handleError('randomPassword')));
	}
	updatePassword(id: number, newPassword: string) {
		return this.http
			.put(
				this.authUrl + '/adminreset',
				{ id: id, newPassword: newPassword },
				this.httpOptions
			)
			.pipe(catchError(this.handleError('resetPassword')));
	}
	deleteUser(id: number) {
		return this.http
			.delete(this.authUrl + '/deleteuser/' + id, this.httpOptions)
			.pipe(catchError(this.handleError('deleteUser')));
	}
	registerUser(newUser: any): Observable<IUser> {
		return this.http
			.post<IUser>(this.authUrl + '/register', newUser, this.httpOptions)
			.pipe(catchError(this.handleError<IUser>('registerUser')));
	}
	getKeyValue(key: string) {
		console.log('getWorkingMode');
		return this.http
			.get(this.adminUrl + '/setting/' + key, this.httpOptions)
			.pipe(catchError(this.handleError('getField')));
	}
	setKeyValue(objet: any) {
		return this.http
			.put(this.adminUrl + '/setting', objet, this.httpOptions)
			.pipe(catchError(this.handleError('setField')));
	}
}
