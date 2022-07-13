import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/message.service';
import { AdminService } from '../../service/admin.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
	selector: 'admin-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
	constructor(
		private adminService: AdminService,
		private messageService: MessageService,
		private clipboard: Clipboard
	) {}

	permGroups = [0, 1, 2, 3, 4];
	loading: boolean[] = [false, false, false];

	@Input() user?: IUser;
	@Output() events = new EventEmitter<string>();

	usernameControl = new FormControl('');
	passwordControl = new FormControl('');
	deleteConfirmControl = new FormControl('');
	deletePhrase: string = '';

	hide: boolean = true;
	ngOnInit(): void {}

	interval = setInterval(() => {
		if (typeof this.user === 'undefined') return;

		clearInterval(this.interval);

		this.usernameControl.setValue(this.user!.username);
		this.generateDeletePhrase();
	}, 10);

	log(msg: string) {
		this.messageService.add(msg);
	}

	saveUsername() {
		var username = this.usernameControl.value;
		this.loading[0] = true;
		this.adminService
			.updateUsername(this.user!.id, username)
			.subscribe((updUser) => {
				console.log(updUser);
				this.loading[0] = false;
				if (typeof updUser === 'undefined') {
					console.log('no');
				} else {
					this.events.emit('fullreload');
				}
			});
	}
	isUser(obj: any): obj is IUser {
		return 'id' in obj && 'username' in obj && 'perm_group' in obj;
	}
	randomPassword() {
		this.adminService.getRandomPassword().subscribe((obj: any) => {
			this.passwordControl.setValue(obj.password);
			this.clipboard.copy(obj.password);
			this.log('Password generiert und in der Zwischenablage');
		});
	}
	savePassword() {
		this.loading[1] = true;
		this.adminService
			.updatePassword(this.user!.id, this.passwordControl.value)
			.subscribe((res: any) => {
				this.loading[1] = false;
				this.clipboard.copy(res.newPassword);
				this.log(
					'Neues Passwort wurde gespeichert und in die Zwischenablage kopiert'
				);
			});
	}
	updatePermission() {
		this.loading[2] = true;
		this.adminService
			.updatePermission(this.user!.id, this.user!.perm_group)
			.subscribe((res: IUser) => {
				this.loading[2] = false;
				this.events.emit('reload');
			});
	}
	generateDeletePhrase() {
		this.deletePhrase = 'tiboli/' + this.user!.username;
	}
	deleteAccount() {
		if (this.deleteConfirmControl.value == this.deletePhrase) {
			this.adminService
				.deleteUser(this.user!.id)
				.subscribe((result: any) => {
					if (result.success) {
						this.log('Nutzer gelöscht');
						this.events.emit('backToList');
					} else {
						this.log('Konte nicht gelöscht werden');
					}
				});
		} else {
			this.log('Bestätigungstext nicht korrekt');
			this.deleteConfirmControl.setValue('');
		}
	}
}
