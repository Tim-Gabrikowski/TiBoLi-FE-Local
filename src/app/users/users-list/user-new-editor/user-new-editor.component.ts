import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClass } from 'src/app/interfaces/class';
import { IUser } from 'src/app/interfaces/user';
import { UsersService } from '../../services/users.service';

@Component({
	selector: 'app-user-new-editor',
	templateUrl: './user-new-editor.component.html',
	styleUrls: ['./user-new-editor.component.css'],
})
export class UserNewEditorComponent implements OnInit {
	constructor(private userService: UsersService, private router: Router) {}

	ngOnInit(): void {
		this.getClasses();
	}
	newUser?: IUser;
	classes: IClass[] = [];

	getClasses() {
		this.userService.getClasses().subscribe((classes) => {
			this.classes = classes;
		});
	}
	createNewUser(vorname: string, nachname: string, classId: number) {
		console.log(vorname, nachname, classId);
		this.userService.newUser(vorname, nachname, classId, (user: IUser) => {
			this.newUser! = user;
		});
	}
	navToUser() {
		this.router.navigate(['users/' + this.newUser!.id]);
	}
}
