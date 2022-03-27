import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';

@Component({
	selector: 'app-back',
	templateUrl: './back.component.html',
	styleUrls: ['./back.component.css'],
})
export class BackComponent implements OnInit {
	constructor(private transactionsService: TransactionsService) {}

	ngOnInit(): void {}

	back(mNumber: string) {
		this.transactionsService.finnishTransaction(Number(mNumber), () => {
			window.location.reload();
		});
	}
}
