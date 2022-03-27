import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'transactionStatus',
})
export class TransactionStatusPipe implements PipeTransform {
	transform(value: number, ...args: unknown[]): string {
		var back = '';
		switch (value) {
			case 0:
				back = 'erfolgreich';
				break;
			case 1:
				back = 'ausstehend';
				break;
			case 2:
				back = 'bereits ausgeliehen';
				break;
			case 3:
				back = 'unbek. Fehler';
				break;
			case 4:
				back = 'Buch nicht gefunden';
				break;
			case 5:
				back = "clicke 'Ausleihen' zum starten";
				break;
		}
		return back;
	}
}
