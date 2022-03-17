import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { UsersService } from '../services/users.service';

@Component({
	selector: 'app-user-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
	constructor(
		private userService: UsersService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	user?: IUser;

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.getUser(Number(params.bNumber));
		});
	}

	getUser(id: number) {
		this.userService.getUserWithClass(id).subscribe((user) => {
			this.user = user;
		});
	}
	backToList() {
		this.router.navigate(['/users']);
	}
}
