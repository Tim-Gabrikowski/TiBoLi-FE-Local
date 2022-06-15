import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { windowWhen } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { MessageService } from '../message.service';
import { environment } from 'src/environments/environment';

const USER_KEY = 'auth-user';

interface User {
	id: Number;
	username: String;
	perm_group: Number;
}
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	constructor(
		private authService: AuthService,
		private tokenStorage: TokenStorageService,
		private messageService: MessageService,
		private router: Router
	) {}

	ngOnInit(): void {
		const user = window.sessionStorage.getItem(USER_KEY);
		user != null ? (this.loggedIn = true) : (this.loggedIn = false);
		console.log('onInit!');
		if (user) {
			this.user = JSON.parse(user);
		}
	}
	loggedIn = false;

	user?: User;

	hide = true;
	login(username: string, password: string) {
		this.authService.login(username, password).subscribe(
			(data: any) => {
				console.log(data);
				this.tokenStorage.saveToken(data.accessToken);
				this.tokenStorage.saveRefreshToken(data.refreshToken);
				this.tokenStorage.saveUser(data.user);
				this.user = data.user;
				this.loggedIn = true;

				environment.production
					? window.location.reload()
					: this.router.navigate(['/']);
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
			window.location.reload();
		});
	}
}
