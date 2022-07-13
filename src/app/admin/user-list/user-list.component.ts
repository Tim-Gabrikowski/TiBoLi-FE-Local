import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { AdminService } from '../service/admin.service';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css'],
})
export class AdminUserListComponent implements OnInit {
	constructor(private adminService: AdminService, private router: Router) {}

	users: IUser[] = [];
	filteredUsers: IUser[] = [];
	searched: boolean = false;
	newEditor: boolean = false;

	ngOnInit(): void {
		this.getUsers();
	}
	getUsers() {
		this.adminService.getUsers().subscribe((users) => {
			this.users = users;
		});
	}
	backToHome() {
		this.router.navigate(['admin']);
	}
	searchUsers(term: string) {
		this.filteredUsers = this.users.filter((user) =>
			this.filter(user, term)
		);
		this.searched = true;
	}
	filter(user: IUser, term: string) {
		var searchTerm = term.toLowerCase().replace(/ /g, '');
		if (term.startsWith('#')) {
			searchTerm = searchTerm.slice(1);
			var perm = this.numToPerm(user.perm_group);
			var permission = perm.toLowerCase().replace(/ /g, '');
			return permission.includes(searchTerm);
		} else {
			var username = user.username.toLowerCase().replace(/ /g, '');
			return username.includes(searchTerm);
		}
	}
	undoSearch() {
		this.filteredUsers = [];
		this.searched = false;
	}
	toggleNewEditor() {
		this.newEditor = !this.newEditor;
	}
	onEvent(event: string) {
		if ((event = 'reloadList')) {
			this.getUsers();
		}
	}
	numToPerm(value: number) {
		var rankInWords = '';
		switch (value) {
			case 0:
				rankInWords = 'Besucher*in';
				break;
			case 1:
				rankInWords = 'Schüler*in';
				break;
			case 2:
				rankInWords = 'Lehrer*in';
				break;
			case 3:
				rankInWords = 'Teammitglied';
				break;
			case 4:
				rankInWords = 'Admin';
				break;
		}
		return rankInWords;
	}
}
