import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'permGroup',
})
export class PermGroupPipe implements PipeTransform {
	transform(value: Number, ...args: unknown[]): String {
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
