import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { MessageService } from '../message.service';

const USER_KEY = 'auth-user';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	constructor(
		private authService: AuthService,
		private tokenStorage: TokenStorageService,
		private messageService: MessageService
	) {}

	ngOnInit(): void {
		const user = window.sessionStorage.getItem(USER_KEY);
		user != null ? (this.loggedIn = true) : (this.loggedIn = false);
	}
	loggedIn = false;
	hide = true;
	login(username: string, password: string) {
		this.authService.login(username, password).subscribe(
			(data: any) => {
				console.log(data);
				this.tokenStorage.saveToken(data.accessToken);
				this.tokenStorage.saveRefreshToken(data.refreshToken);
				this.tokenStorage.saveUser(data.user);
				this.loggedIn = true;
			},
			(err) => {
				console.log(err);
				this.messageService.add('Nutzername oder Passwort falsch.');
			}
		);
	}
	logout() {
		var refreshToken = this.tokenStorage.getRefreshToken();
		if (refreshToken == null) return;

		this.authService.logout(refreshToken).subscribe((s) => {
			this.messageService.add('Logged out.');
			this.tokenStorage.signOut();
			this.loggedIn = false;
		});
	}
}
