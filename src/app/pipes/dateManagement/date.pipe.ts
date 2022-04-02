import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'date',
})
export class DatePipe implements PipeTransform {
	transform(date: number, ...args: unknown[]): string {
		var value = new Date(date);
		var hours = value.getHours();
		var minutes = '0' + value.getMinutes();
		var seconds = '0' + value.getSeconds();
		var day = '0' + value.getDate();
		var month = '0' + value.getMonth();
		var year = value.getFullYear();

		var formattedTime =
			hours +
			':' +
			minutes.substring(minutes.length - 2) +
			':' +
			seconds.substring(seconds.length - 2);

		var formattedDate =
			day.substring(day.length - 2) +
			'.' +
			month.substring(month.length - 2) +
			'.' +
			year;
		return formattedDate + ' ' + formattedTime;
	}
}
