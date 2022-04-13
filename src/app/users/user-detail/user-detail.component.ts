import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ITransaction } from 'src/app/interfaces/transaction';
import { ITransactionBook } from 'src/app/interfaces/transactionBook';
import { IUser } from 'src/app/interfaces/user';
import { TransactionsService } from 'src/app/transactions/services/transactions.service';
import { UsersService } from '../services/users.service';
import { Location } from '@angular/common';

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
		private transactionService: TransactionsService,
		private location: Location
	) {}

	user?: IUser;
	transactions: ITransactionBook[] = [];

	page: string = 'overview';
	pageIndex: number = 0;
	tabs: string[] = ['overview', 'edit', 'transactions'];
	@ViewChild('tabGroup', { static: false }) tabGroup?: MatTabGroup;

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.getUser(Number(params.bNumber));
			this.getTransactions(Number(params.bNumber));

			if (params.page) this.page = params.page;
			var index = this.tabs.indexOf(this.page);
			this.pageIndex = index;
		});
	}
	interval = setInterval(() => {
		if (typeof this.tabGroup === 'undefined') return;

		clearInterval(this.interval);

		this.selectTab(this.pageIndex);
	}, 10);

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
	selectTab(index: number) {
		this.setPageUrl(index);
		const tabGroup = this.tabGroup;
		if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;

		tabGroup.selectedIndex = index;
	}
	setPageUrl(index: number) {
		this.location.go('/users/' + this.user!.id + '/' + this.tabs[index]);
	}
	selectedTabChange(event: MatTabChangeEvent) {
		this.setPageUrl(event.index);
	}
}
