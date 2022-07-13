import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';

@Component({
	selector: 'admin-user-information',
	templateUrl: './user-information.component.html',
	styleUrls: ['./user-information.component.css'],
})
export class UserInformationComponent implements OnInit {
	constructor() {}

	@Input() user?: IUser;
	ngOnInit(): void {}
}
