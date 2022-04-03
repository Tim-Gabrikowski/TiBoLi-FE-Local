import { Component, Input, OnInit } from '@angular/core';
import { ITransaction } from 'src/app/interfaces/transaction';
import { ITransactionBook } from 'src/app/interfaces/transactionBook';
import { IUser } from 'src/app/interfaces/user';
import { TransactionsService } from 'src/app/transactions/services/transactions.service';

@Component({
	selector: 'app-user-transactions',
	templateUrl: './user-transactions.component.html',
	styleUrls: ['./user-transactions.component.css'],
})
export class UserTransactionsComponent implements OnInit {
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
