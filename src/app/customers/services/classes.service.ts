import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
		return this.http.get<IClass[]>(this.classesUrl, this.httpOptions);
	}
	updateClass(newClass: IClass): Observable<IClass> {
		return this.http.put<IClass>(
			this.classesUrl,
			newClass,
			this.httpOptions
		);
	}
	createNewClass(newClass: IClass): Observable<IClass> {
		return this.http.post<IClass>(
			this.classesUrl,
			newClass,
			this.httpOptions
		);
	}
}
