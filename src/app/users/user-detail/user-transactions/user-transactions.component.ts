import { Component, Input, OnInit } from '@angular/core';
import { ITransaction } from 'src/app/interfaces/transaction';
import { IUser } from 'src/app/interfaces/user';
import { TransactionsService } from 'src/app/transactions/services/transactions.service';

@Component({
	selector: 'app-user-transactions',
	templateUrl: './user-transactions.component.html',
	styleUrls: ['./user-transactions.component.css'],
})
export class UserTransactionsComponent implements OnInit {
	constructor(private transactionService: TransactionsService) {}

	@Input() user?: IUser;
	transactions: ITransaction[] = [];
	transactionsGot: boolean = false;

	displayedColumns: string[] = ['position', 'name', 'weight'];

	ngOnInit(): void {
		var interval = setInterval(() => {
			// get elem
			if (typeof this.user === undefined) return;
			clearInterval(interval);

			// the rest of the code
			this.getTransactions(this.user!.id);
		}, 10);
	}
	getTransactions(bNum: number) {
		this.transactionService
			.getTransactionsFromUser(bNum)
			.subscribe((result) => {
				this.transactions = result;
				this.transactions = this.transactions.reverse();
				this.transactionsGot = true;
			});
	}
}
