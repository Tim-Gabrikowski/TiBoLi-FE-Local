import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminService } from './admin/service/admin.service';
import { TokenStorageService } from './auth/token-storage.service';

const USER_KEY = 'auth-user';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'TiBoLi';
	footerText = 'Tim Gabrikowski';

	constructor(
		private tokenService: TokenStorageService,
		private adminService: AdminService
	) {}
	showLogin: boolean = true;
	workMode: boolean = false;
	toggleLogin() {
		this.showLogin = !this.showLogin;
	}
	closeLogin() {
		this.showLogin = false;
	}
	ngOnInit() {
		console.log('Production?', environment.production);
		this.showLogin = !this.getLoggedIn();
		console.log('onINIT - getWorkingMode');
		this.adminService.getWorkingMode().subscribe((res: any) => {
			console.log(res);
			if (res.value == 'true' && this.getUserPerm() != 4) {
				this.workMode = true;
			}
		});
	}
	getLoggedIn() {
		var user = this.tokenService.getRawUser();
		return (user = null ? false : true);
	}
	getUserPerm() {
		var user = this.tokenService.getUser();
		return user.perm_group;
	}
}
