import { Component, Input, OnInit } from '@angular/core';
import { ITransaction } from 'src/app/interfaces/transaction';
import { ITransactionBook } from 'src/app/interfaces/transactionBook';
import { ICustomer } from 'src/app/interfaces/customer';
import { TransactionsService } from 'src/app/transactions/services/transactions.service';

@Component({
	selector: 'app-customer-transactions',
	templateUrl: './customer-transactions.component.html',
	styleUrls: ['./customer-transactions.component.css'],
})
export class CustomerTransactionsComponent implements OnInit {
	constructor(private transactionService: TransactionsService) {}

	@Input() transactions?: ITransactionBook[];
	transactionsGot: boolean = false;

	displayedColumns: string[] = [
		'title',
		'author',
		'mNumber',
		'lentdate',
		'backdate',
	];

	ngOnInit(): void {}
}
