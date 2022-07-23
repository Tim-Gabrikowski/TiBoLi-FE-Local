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

	keys = ['workMode', 'maxLentTime'];

	settingsControls = [new FormControl(''), new FormControl('')];
	kvObjects: any = [{ id: 0, key: '', value: '' }];
	loading: boolean[] = [false, false];

	ngOnInit(): void {
		this.keys.forEach((key, index) => {
			this.adminService.getKeyValue(key).subscribe((res: any) => {
				console.log(res);
				this.kvObjects[index] = res;
				if (index == 1) {
					this.settingsControls[index].setValue(
						Number(this.kvObjects[index].value == res.value)
					);
				} else {
					this.settingsControls[index].setValue(
						this.kvObjects[index].value == res.value
					);
				}
			});
		});
	}

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

	saveMaxLentDate() {
		this.kvObjects[1].value = this.daysToSeconds(
			this.settingsControls[1].value
		);
		this.loading[1] = true;
		this.adminService
			.setKeyValue(this.kvObjects[1])
			.subscribe((res: any) => {
				this.loading[1] = false;
				this.settingsControls[1].setValue(
					this.secondsToDays(res.value)
				);
			});
	}

	backToHome() {
		this.router.navigate(['admin']);
	}
	daysToSeconds(days: any) {
		return Number(days) * 24 * 60 * 60;
	}
	secondsToDays(seconds: any) {
		return Number(seconds) / 60 / 60 / 24;
	}
}
