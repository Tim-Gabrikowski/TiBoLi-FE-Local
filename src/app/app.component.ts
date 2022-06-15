import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

const USER_KEY = 'auth-user';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'TiBoLi';
	footerText = 'Tim Gabrikowski';

	constructor() {}
	showLogin: boolean = false;
	toggleLogin() {
		this.showLogin = !this.showLogin;
	}
	closeLogin() {
		this.showLogin = false;
	}
	OnInit() {
		console.log('Production?', environment.production);
	}
}
