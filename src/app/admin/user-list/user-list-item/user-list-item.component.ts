import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';

@Component({
	selector: 'admin-user-list-item',
	templateUrl: './user-list-item.component.html',
	styleUrls: ['./user-list-item.component.css'],
})
export class UserListItemComponent implements OnInit {
	constructor(private router: Router) {}
	@Input() user?: IUser;
	ngOnInit(): void {}
	onSelect() {
		this.router.navigate(['admin/users/' + this.user!.id + '/overview']);
	}
}
