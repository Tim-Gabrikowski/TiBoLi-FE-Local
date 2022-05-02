import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClass } from 'src/app/interfaces/class';
import { IUser } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/message.service';
import { PdfService } from 'src/app/pdf.service';
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
		private messageService: MessageService,
		private pdfService: PdfService
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
	loadLables: boolean = false;
	getPdfOfUsers(startAt: string) {
		var body = {
			startAt: Number(startAt),
			users: [this.newUser!],
		};
		console.log(body);
		this.loadLables = true;
		this.pdfService.downloadUserPDF(body, () => {
			this.loadLables = false;
		});
	}
	defaultLabelPosition = 0;
	labelPositions = [
		{
			position: 0,
			label: '1:1',
		},
		{
			position: 1,
			label: '1:2',
		},
		{
			position: 2,
			label: '1:3',
		},
		{
			position: 3,
			label: '2:1',
		},
		{
			position: 4,
			label: '2:2',
		},
		{
			position: 5,
			label: '2:3',
		},
		{
			position: 6,
			label: '3:1',
		},
		{
			position: 7,
			label: '3:2',
		},
		{
			position: 8,
			label: '3:3',
		},
		{
			position: 9,
			label: '4:1',
		},
		{
			position: 10,
			label: '4:2',
		},
		{
			position: 11,
			label: '4:3',
		},
		{
			position: 12,
			label: '5:1',
		},
		{
			position: 13,
			label: '5:2',
		},
		{
			position: 14,
			label: '5:3',
		},
		{
			position: 15,
			label: '6:1',
		},
		{
			position: 16,
			label: '6:2',
		},
		{
			position: 17,
			label: '6:3',
		},
		{
			position: 18,
			label: '7:1',
		},
		{
			position: 19,
			label: '7:2',
		},
		{
			position: 20,
			label: '7:3',
		},
	];
}
