import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { TransactionsService } from '../services/transactions.service';

@Component({
	selector: 'app-transactions-extend',
	templateUrl: './extend.component.html',
	styleUrls: ['./extend.component.css'],
})
export class ExtendComponent implements OnInit {
	constructor(
		private transactionsService: TransactionsService,
		private router: Router,
		private messageService: MessageService
	) {}

	ngOnInit(): void {}

	extend(mNumber: string) {
		this.transactionsService
			.extendTransaction(Number(mNumber))
			.subscribe((res: any) => {
				this.router.navigate(['/transactions/']);
				this.messageService.add(this.transform(res.maxDate));
			});
	}
	transform(date: number): string {
		if (date <= 100000000) return '';

		var value = new Date(date);

		var day = '0' + value.getDate();
		var month = '0' + (value.getMonth() + 1);
		var year = value.getFullYear();

		var formattedDate =
			day.substring(day.length - 2) +
			'.' +
			month.substring(month.length - 2) +
			'.' +
			year;
		return formattedDate;
	}
}
