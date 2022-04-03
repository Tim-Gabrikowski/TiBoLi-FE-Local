import { Component } from '@angular/core';
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

	constructor(
		private messageService: MessageService,
		private settingsService: SettingsServiceService
	) {}

	loggedIn: boolean = false;

	OnInit() {
		if (localStorage.getItem('loggedIn') == 'true') {
			this.loggedIn = true;
		} else {
			this.loggedIn = false;
		}
	}

	login(password: string) {
		this.settingsService.checkLogin(password, (status: number) => {
			if (status == 1) {
				this.loggedIn = true;
				localStorage.setItem('loggedIn', 'true');
			} else {
				this.messageService.add('FALSCH!');
			}
		});
	}
}
