import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from 'src/app/interfaces/customer';
import { MessageService } from 'src/app/message.service';
import { CustomersService } from '../services/customers.service';

@Component({
	selector: 'app-customers-list',
	templateUrl: './customers-list.component.html',
	styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {
	constructor(
		private customerService: CustomersService,
		private messageService: MessageService,
		private router: Router
	) {}

	customers: ICustomer[] = [];
	filteredCustomers: ICustomer[] = [];
	searched: boolean = false;

	newEditor: boolean = false;

	ngOnInit(): void {
		this.getCustomers();
	}

	log(msg: string) {
		this.messageService.add(msg);
	}
	backToHome() {
		this.router.navigate(['']);
	}
	getCustomers() {
		this.customerService.getCustomers().subscribe((customers) => {
			console.log(customers);
			this.customers = customers;
			this.log('Nutzer geladen');
		});
	}
	searchCustomer(term: string) {
		this.filteredCustomers = this.customers.filter(
			(customer) =>
				customer.name.toLowerCase().includes(term.toLowerCase()) ||
				customer.lastname.toLowerCase().includes(term.toLowerCase())
		);
		this.searched = true;
	}
	undoSearch() {
		this.filteredCustomers = [];
		this.searched = false;
	}
	toggleNewEditor() {
		this.newEditor = !this.newEditor;
	}
}
