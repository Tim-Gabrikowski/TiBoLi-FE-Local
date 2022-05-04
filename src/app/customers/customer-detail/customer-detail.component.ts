import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ITransaction } from 'src/app/interfaces/transaction';
import { ITransactionBook } from 'src/app/interfaces/transactionBook';
import { ICustomer } from 'src/app/interfaces/customer';
import { TransactionsService } from 'src/app/transactions/services/transactions.service';
import { CustomersService } from '../services/customers.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-customer-detail',
	templateUrl: './customer-detail.component.html',
	styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit {
	constructor(
		private customerService: CustomersService,
		private route: ActivatedRoute,
		private router: Router,
		private transactionService: TransactionsService,
		private location: Location
	) {}

	customer?: ICustomer;
	transactions: ITransactionBook[] = [];

	page: string = 'overview';
	pageIndex: number = 0;
	tabs: string[] = ['overview', 'edit', 'transactions'];
	@ViewChild('tabGroup', { static: false }) tabGroup?: MatTabGroup;

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.getCustomer(Number(params.bNumber));
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

	getCustomer(id: number) {
		this.customerService.getCustomerWithClass(id).subscribe((customer) => {
			this.customer = customer;
		});
	}
	backToList() {
		this.router.navigate(['/customers']);
	}
	getTransactions(bNum: number) {
		this.transactionService
			.getTransactionsWithBookFromCustomer(bNum)
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
		this.location.go(
			'/customers/' + this.customer!.id + '/' + this.tabs[index]
		);
	}
	selectedTabChange(event: MatTabChangeEvent) {
		this.setPageUrl(event.index);
	}
}
