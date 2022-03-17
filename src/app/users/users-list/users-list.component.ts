import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/message.service';
import { UsersService } from '../services/users.service';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
	constructor(
		private userService: UsersService,
		private messageService: MessageService,
		private router: Router
	) {}

	users: IUser[] = [];
	filteredUsers: IUser[] = [];
	searched: boolean = false;

	newEditor: boolean = false;

	ngOnInit(): void {
		this.getBooks();
	}

	log(msg: string) {
		this.messageService.add(msg);
	}
	backToHome() {
		this.router.navigate(['']);
	}
	getBooks() {
		this.userService.getUsers().subscribe((users) => {
			this.users = users;
			this.log('Nutzer geladen');
		});
	}
	searchUser(term: string) {
		this.filteredUsers = this.users.filter(
			(user) =>
				user.vorname.toLowerCase().includes(term.toLowerCase()) ||
				user.nachname.toLowerCase().includes(term.toLowerCase())
		);
		this.searched = true;
	}
	undoSearch() {
		this.filteredUsers = [];
		this.searched = false;
	}
	toggleNewEditor() {
		this.newEditor = !this.newEditor;
	}
}
