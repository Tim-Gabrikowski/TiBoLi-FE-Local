import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'unixToDateString',
})
export class UnixToDateStringPipe implements PipeTransform {
	transform(date: number, ...args: unknown[]): string {
		if (date <= 100000000) return '';

		var value = new Date(date);

		var hours = '0' + value.getHours();
		var minutes = '0' + value.getMinutes();
		var seconds = '0' + value.getSeconds();
		var day = '0' + value.getDate();
		var month = '0' + (value.getMonth() + 1);
		var year = value.getFullYear();

		var formattedTime =
			hours.substring(hours.length - 2) +
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
