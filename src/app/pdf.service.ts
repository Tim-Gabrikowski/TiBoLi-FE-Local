import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { retryWhen, delay, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

@Injectable({
	providedIn: 'root',
})
export class PdfService {
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

	BookPdfURL: string = environment.pdfUrl + '/books';

	downloadBookPDF(body: {}, callback: Function): any {
		var mediaType = 'application/pdf';
		this.http
			.post(this.BookPdfURL, body, { responseType: 'blob' })
			.subscribe(
				(response) => {
					var blob = new Blob([response], { type: mediaType });
					var fileURL = URL.createObjectURL(blob);
					callback();
					window.open(fileURL);
				},
				(e) => {
					throwError(e);
				}
			);
	}
	CustomerPdfURL: string = environment.pdfUrl + '/customers';

	downloadCustomerPDF(body: {}, callback: Function): any {
		var mediaType = 'application/pdf';
		this.http
			.post(this.CustomerPdfURL, body, { responseType: 'blob' })
			.subscribe(
				(response) => {
					var blob = new Blob([response], { type: mediaType });
					var fileURL = URL.createObjectURL(blob);
					callback();
					window.open(fileURL);
				},
				(e) => {
					throwError(e);
				}
			);
	}
	//error Handling
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
	//log to MessageService
	log(message: string) {
		this.messageService.add(message);
	}
}
