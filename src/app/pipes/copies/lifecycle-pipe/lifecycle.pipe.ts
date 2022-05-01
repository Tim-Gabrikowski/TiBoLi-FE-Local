import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'lifecycle',
})
export class LifecyclePipe implements PipeTransform {
	transform(value: number | Number, ...args: unknown[]): string {
		var back = '';
		switch (value) {
			case 1:
				back = 'In Ausleihbetrieb';
				break;
			case 5:
				back = 'Aus Ausleihe genommen';
				break;
		}
		return back;
	}
}
