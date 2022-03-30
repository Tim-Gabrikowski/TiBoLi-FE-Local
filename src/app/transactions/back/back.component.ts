import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from '../services/transactions.service';

@Component({
	selector: 'app-back',
	templateUrl: './back.component.html',
	styleUrls: ['./back.component.css'],
})
export class BackComponent implements OnInit {
	constructor(
		private transactionsService: TransactionsService,
		private router: Router
	) {}

	ngOnInit(): void {}

	back(mNumber: string) {
		this.transactionsService.finnishTransaction(Number(mNumber), () => {
			this.router.navigate(['/transactions/back']);
		});
	}
}
