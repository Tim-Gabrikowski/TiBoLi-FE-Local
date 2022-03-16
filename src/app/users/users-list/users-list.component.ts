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
}
