import { Component, Input, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/interfaces/customer';

@Component({
	selector: 'app-customer-information',
	templateUrl: './customer-information.component.html',
	styleUrls: ['./customer-information.component.css'],
})
export class CustomerInformationComponent implements OnInit {
	constructor() {}

	@Input() customer?: ICustomer;
	ngOnInit(): void {}
}
