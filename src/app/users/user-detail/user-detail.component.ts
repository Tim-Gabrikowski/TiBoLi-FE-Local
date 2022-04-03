import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITransaction } from 'src/app/interfaces/transaction';
import { ITransactionBook } from 'src/app/interfaces/transactionBook';
import { IUser } from 'src/app/interfaces/user';
import { TransactionsService } from 'src/app/transactions/services/transactions.service';
import { UsersService } from '../services/users.service';

@Component({
	selector: 'app-user-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
	constructor(
		private userService: UsersService,
		private route: ActivatedRoute,
		private router: Router,
		private transactionService: TransactionsService
	) {}

	user?: IUser;
	transactions: ITransactionBook[] = [];

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.getUser(Number(params.bNumber));
			this.getTransactions(Number(params.bNumber));
		});
	}

	getUser(id: number) {
		this.userService.getUserWithClass(id).subscribe((user) => {
			this.user = user;
		});
	}
	backToList() {
		this.router.navigate(['/users']);
	}
	getTransactions(bNum: number) {
		this.transactionService
			.getTransactionsWithBookFromUser(bNum)
			.subscribe((result) => {
				this.transactions = result;
			});
	}
}
