import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWhish } from 'src/app/interfaces/whish';
const WHISH_API = environment.apiUrl + '/whish';
const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	body: {},
};

@Injectable({
	providedIn: 'root',
})
export class BookWhishService {
	constructor(private http: HttpClient) {}

	getWhishes(): Observable<IWhish[]> {
		return this.http.get<IWhish[]>(WHISH_API, httpOptions);
	}
	postWhish(whish: any) {
		return this.http.post(WHISH_API, whish, httpOptions);
	}
}
