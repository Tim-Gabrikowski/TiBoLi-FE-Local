import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
	providedIn: 'root',
})
export class MessageService {
	messages: string[] = [];

	constructor(private _snackBar: MatSnackBar) {}
	add(message: string) {
		this.messages.push(message);
		this._snackBar.open(message, 'okay', {
			duration: 3000,
		});
	}
	clear() {
		this.messages = [];
		this._snackBar.open('messages cleared', '', {
			duration: 1000,
		});
	}
}
