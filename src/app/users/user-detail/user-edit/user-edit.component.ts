import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClass } from 'src/app/interfaces/class';
import { IUser } from 'src/app/interfaces/user';
import { UsersService } from '../../services/users.service';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
	constructor(private userService: UsersService, private router: Router) {}

	@Input() user?: IUser;
	ngOnInit(): void {
		this.getClasses();
	}

	classes: IClass[] = [];

	getClasses() {
		this.userService.getClasses().subscribe((classes) => {
			this.classes = classes;
		});
	}

	onSubmit(vorname: string, nachname: string, classId: number) {
		this.user!.vorname = vorname;
		this.user!.nachname = nachname;
		this.user!.classId = classId;
		this.userService.editUser(this.user!);
		window.location.reload();
	}
	deleteUser() {
		this.userService.deleteUser(this.user!.id);
		this.router.navigate(['users']);
	}
}
