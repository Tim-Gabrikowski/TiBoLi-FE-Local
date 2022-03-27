import { Component, OnInit } from '@angular/core';
import { ITransaction } from '../interfaces/transaction';
import { TransactionsService } from './services/transactions.service';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
	constructor(private transactionsService: TransactionsService) {}

	transactions: ITransaction[] = [];
	ngOnInit(): void {
		this.getAllTransactions();
	}

	getAllTransactions() {
		this.transactionsService.getAll().subscribe((data) => {
			this.transactions = data;
		});
	}
}
