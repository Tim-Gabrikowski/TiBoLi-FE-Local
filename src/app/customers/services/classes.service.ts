import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IClass } from 'src/app/interfaces/class';
import { MessageService } from 'src/app/message.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ClassesService {
	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) {}
	private classesUrl = environment.apiUrl + '/classes';

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
	getClasses(): Observable<IClass[]> {
		return this.http
			.get<IClass[]>(this.classesUrl, this.httpOptions)
			.pipe(catchError(this.handleError<any>('updateCustomer')));
	}
	updateClass(newClass: IClass): Observable<IClass> {
		return this.http
			.put<IClass>(this.classesUrl, newClass, this.httpOptions)
			.pipe(catchError(this.handleError<any>('updateCustomer')));
	}
	createNewClass(newClass: IClass): Observable<IClass> {
		return this.http
			.post<IClass>(this.classesUrl, newClass, this.httpOptions)
			.pipe(catchError(this.handleError<any>('updateCustomer')));
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
}
