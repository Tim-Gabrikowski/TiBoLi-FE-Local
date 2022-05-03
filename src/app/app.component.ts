import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { TokenStorageService } from './auth/token-storage.service';
import { MessageService } from './message.service';
import { SettingsServiceService } from './settings-service.service';

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
	OnInit() {}
}
