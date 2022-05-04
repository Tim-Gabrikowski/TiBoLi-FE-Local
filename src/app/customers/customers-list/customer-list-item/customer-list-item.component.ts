import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from 'src/app/interfaces/customer';

@Component({
	selector: 'app-customer-list-item',
	templateUrl: './customer-list-item.component.html',
	styleUrls: ['./customer-list-item.component.css'],
})
export class CustomerListItemComponent implements OnInit {
	constructor(private router: Router) {}

	@Input() customer?: ICustomer;
	selectedCustomer?: ICustomer;

	ngOnInit(): void {}

	onSelectCustomer(customer: ICustomer) {
		this.selectedCustomer = customer;
		this.router.navigate([`/customers/${this.selectedCustomer.id}`]);
	}
}
