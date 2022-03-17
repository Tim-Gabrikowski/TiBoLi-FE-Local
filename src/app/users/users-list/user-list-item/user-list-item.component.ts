import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';

@Component({
	selector: 'app-user-list-item',
	templateUrl: './user-list-item.component.html',
	styleUrls: ['./user-list-item.component.css'],
})
export class UserListItemComponent implements OnInit {
	constructor(private router: Router) {}

	@Input() user?: IUser;
	selectedUser?: IUser;

	ngOnInit(): void {}

	onSelectUser(user: IUser) {
		this.selectedUser = user;
		this.router.navigate([`/users/${this.selectedUser.id}`]);
	}
}
