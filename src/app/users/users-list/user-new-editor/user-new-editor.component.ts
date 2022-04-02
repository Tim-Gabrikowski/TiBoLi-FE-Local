import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClass } from 'src/app/interfaces/class';
import { IUser } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/message.service';
import { UsersService } from '../../services/users.service';

@Component({
	selector: 'app-user-new-editor',
	templateUrl: './user-new-editor.component.html',
	styleUrls: ['./user-new-editor.component.css'],
})
export class UserNewEditorComponent implements OnInit {
	constructor(
		private userService: UsersService,
		private router: Router,
		private messageService: MessageService
	) {}

	ngOnInit(): void {
		this.getClasses();
	}
	newUser?: IUser;
	classes: IClass[] = [];

	status: number = 0;

	getClasses() {
		this.userService.getClasses().subscribe((classes) => {
			this.classes = classes;
		});
	}
	createNewUser(vorname: string, nachname: string, classId: number) {
		console.log(vorname, nachname, classId);
		if (vorname === undefined) {
			this.log('Kein Vorname?');
		} else if (nachname === undefined) {
			this.log('Kein Nachanme?');
		} else if (classId === undefined) {
			this.log('Keine Klasse? Bitte Klasse auswählen');
		} else {
			this.userService.newUser(
				vorname,
				nachname,
				classId,
				(user: IUser) => {
					this.newUser! = user;
				}
			);
		}
	}
	navToUser() {
		this.router.navigate(['users/' + this.newUser!.id]);
	}
	log(msg: string) {
		this.messageService.add(msg);
	}
}
