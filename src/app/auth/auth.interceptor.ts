import {
	HTTP_INTERCEPTORS,
	HttpEvent,
	HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
} from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { MessageService } from '../message.service';
// const TOKEN_HEADER_KEY = 'Authorization';  // for Spring Boot back-end
const TOKEN_HEADER_KEY = 'authorization'; // for Node.js Express back-end
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any> =
		new BehaviorSubject<any>(null);
	constructor(
		private tokenService: TokenStorageService,
		private authService: AuthService,
		private messageService: MessageService
	) {}
	log(msg: string) {
		this.messageService.add(msg);
	}
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<Object>> {
		let authReq = req;
		const token = this.tokenService.getToken();
		if (token != null) {
			authReq = this.addTokenHeader(req, token);
		} else {
			this.log('Nicht eingeloggt');
		}
		return next.handle(authReq).pipe(
			catchError((error) => {
				if (
					error instanceof HttpErrorResponse &&
					!authReq.url.includes('auth/login') &&
					error.status === 401
				) {
					console.log(error);
					if (error.error.token) {
						return this.handle403Error(authReq, next);
					} else {
						this.log('Nicht eingeloggt');
					}
				}
				return throwError(error);
			})
		);
	}
	private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
		if (!this.isRefreshing) {
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);
			const token = this.tokenService.getRefreshToken();
			if (token) {
				return this.authService.refreshToken(token).pipe(
					switchMap((token: any) => {
						this.isRefreshing = false;
						this.tokenService.saveToken(token.accessToken);
						this.refreshTokenSubject.next(token.accessToken);

						return next.handle(
							this.addTokenHeader(request, token.accessToken)
						);
					}),
					catchError((err) => {
						this.isRefreshing = false;

						this.tokenService.signOut();
						return throwError(err);
					})
				);
			}
		}
		return this.refreshTokenSubject.pipe(
			filter((token) => token !== null),
			take(1),
			switchMap((token) =>
				next.handle(this.addTokenHeader(request, token))
			)
		);
	}
	private addTokenHeader(request: HttpRequest<any>, token: string) {
		/* for Spring Boot back-end */
		// return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
		/* for Node.js Express back-end */
		return request.clone({
			headers: request.headers.set(TOKEN_HEADER_KEY, 'Baerer ' + token),
		});
	}
}
export const authInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
