import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
	constructor(private router: Router, private adminService: AdminService) {}

	ngOnInit(): void {
		this.adminService.getWorkingMode().subscribe((res: any) => {
			console.log(res);
			this.kvObjects[0] = res;
			this.settingsControls[0].setValue(
				this.kvObjects[0].value == 'true' ? 1 : 0
			);
		});
	}
	settingsControls = [new FormControl('')];
	kvObjects: any = [{ id: 0, key: '', value: '' }];
	loading: boolean[] = [false];

	saveWartung() {
		this.kvObjects[0].value = this.settingsControls[0].value
			? 'true'
			: 'false';
		this.loading[0] = true;
		this.adminService
			.setKeyValue(this.kvObjects[0])
			.subscribe((res: any) => {
				this.loading[0] = false;
				this.settingsControls[0].setValue(res.value == 'true' ? 1 : 0);
			});
	}

	backToHome() {
		this.router.navigate(['admin']);
	}
}
