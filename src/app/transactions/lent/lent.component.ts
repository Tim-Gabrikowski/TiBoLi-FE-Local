import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from '../services/transactions.service';

interface Idata {
	mNumber: number;
	status: number;
}

@Component({
	selector: 'app-transactions-lent',
	templateUrl: './lent.component.html',
	styleUrls: ['./lent.component.css'],
})
export class LentComponent implements OnInit {
	constructor(
		private transactionsService: TransactionsService,
		private router: Router
	) {}
	bNumber: number = 11111;
	mNumbers: number[] = [];
	books: Idata[] = [];
	ngOnInit(): void {}

	setUserNumber(num: string) {
		this.bNumber = Number(num);
	}
	addBook(num: string) {
		this.books.push({ mNumber: Number(num), status: 5 });
		this.mNumbers.push(Number(num));
	}
	newTransactions() {
		this.books.forEach((element) => {
			element.status = 1;
		});
		this.transactionsService.newTransactions(
			this.bNumber,
			this.mNumbers,
			(num: number, status: number) => {
				this.books.forEach((element) => {
					if (element.mNumber == num) {
						element.status = status;
					}
				});
			}
		);
	}
	reload() {
		window.location.reload();
	}
}