import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { AdminService } from '../../service/admin.service';

@Component({
	selector: 'admin-user-new-editor',
	templateUrl: './user-new-editor.component.html',
	styleUrls: ['./user-new-editor.component.css'],
})
export class UserNewEditorComponent implements OnInit {
	constructor(
		private adminService: AdminService,
		private messageService: MessageService,
		private router: Router
	) {}

	@Output() events = new EventEmitter<string>();

	log(msg: string) {
		this.messageService.add(msg);
	}

	inputElements = new FormGroup({
		username: new FormControl(''),
		password: new FormControl(''),
		perm_group: new FormControl(''),
	});
	hide: boolean = true;
	defaultPerm = 1;
	permGroups = [0, 1, 2, 3, 4];

	ngOnInit(): void {}

	registerUser() {
		this.adminService
			.registerUser(this.inputElements.value)
			.subscribe((user) => {
				if (typeof user.id == 'number') {
					this.log(user.id + '');
					this.router.navigate([
						'admin/users/' + user.id + '/overview',
					]);
				} else {
					this.log('Irgendwas ging schief');
					this.events.emit('reloadList');
				}
			});
	}
}
