import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const AUTH_API = environment.apiUrl + '/auth';
const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	body: {},
};
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}
	// login, register
	refreshToken(token: string) {
		return this.http.post(
			AUTH_API + '/refreshtoken',
			{
				token: token,
			},
			httpOptions
		);
	}
	login(username: string, password: string) {
		return this.http.post(
			AUTH_API + '/login',
			{
				username: username,
				password: password,
			},
			httpOptions
		);
	}
	logout(token: string) {
		var newOptions = httpOptions;
		newOptions.body = { token: token };
		return this.http.delete(AUTH_API + '/logout', httpOptions);
	}
}
