import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'date',
})
export class DatePipe implements PipeTransform {
	transform(value: number, ...args: unknown[]): Date {
		var date = new Date(value);
		return date;
	}
}
