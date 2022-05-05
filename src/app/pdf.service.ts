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
