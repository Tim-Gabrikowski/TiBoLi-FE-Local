import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from '../message.service';

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
	constructor(
		public messageService: MessageService,
		public _snackBar: MatSnackBar
	) {}

	public messages: string[] = this.messageService.messages;

	public openSnackBar(msg: string) {
		this._snackBar.open(msg);
	}
	ngOnInit(): void {}
}
