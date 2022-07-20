import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWish } from 'src/app/interfaces/wish';
const WHISH_API = environment.apiUrl + '/wish';
const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	body: {},
};

@Injectable({
	providedIn: 'root',
})
export class BookWishService {
	constructor(private http: HttpClient) {}

	getWishes(): Observable<IWish[]> {
		return this.http.get<IWish[]>(WHISH_API, httpOptions);
	}
	postWish(wish: any) {
		return this.http.post(WHISH_API, wish, httpOptions);
	}
}
