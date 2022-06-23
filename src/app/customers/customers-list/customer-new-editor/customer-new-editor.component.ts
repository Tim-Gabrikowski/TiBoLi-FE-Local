import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClass } from 'src/app/interfaces/class';
import { ICustomer } from 'src/app/interfaces/customer';
import { MessageService } from 'src/app/message.service';
import { PdfService } from 'src/app/pdf.service';
import { ClassesService } from '../../services/classes.service';
import { CustomersService } from '../../services/customers.service';

@Component({
	selector: 'app-customer-new-editor',
	templateUrl: './customer-new-editor.component.html',
	styleUrls: ['./customer-new-editor.component.css'],
})
export class CustomerNewEditorComponent implements OnInit {
	constructor(
		private customerService: CustomersService,
		private router: Router,
		private messageService: MessageService,
		private pdfService: PdfService,
		private classService: ClassesService
	) {}

	ngOnInit(): void {
		this.getClasses();
	}
	newCustomer?: ICustomer;
	classes: IClass[] = [];

	status: number = 0;

	getClasses() {
		this.classService.getClasses().subscribe((classes) => {
			this.classes = classes;
		});
	}
	createNewCustomer(name: string, lastname: string, classId: number) {
		console.log(name, lastname, classId);
		if (name === undefined) {
			this.log('Kein name?');
		} else if (lastname === undefined) {
			this.log('Kein Nachanme?');
		} else if (classId === undefined) {
			this.log('Keine Klasse? Bitte Klasse auswählen');
		} else {
			this.customerService.newCustomer(
				name,
				lastname,
				classId,
				(customer: ICustomer) => {
					this.newCustomer! = customer;
				}
			);
		}
	}
	navToCustomer() {
		this.router.navigate(['customers/' + this.newCustomer!.id]);
	}
	log(msg: string) {
		this.messageService.add(msg);
	}
	loadLables: boolean = false;
	getPdfOfCustomers(startAt: string) {
		var body = {
			startAt: Number(startAt),
			customers: [this.newCustomer!],
		};
		console.log(body);
		this.loadLables = true;
		this.pdfService.downloadCustomerPDF(body, () => {
			this.loadLables = false;
		});
	}
	defaultLabelPosition = 0;
	labelPositions = [
		{
			position: 0,
			label: '1:1',
		},
		{
			position: 1,
			label: '1:2',
		},
		{
			position: 2,
			label: '1:3',
		},
		{
			position: 3,
			label: '2:1',
		},
		{
			position: 4,
			label: '2:2',
		},
		{
			position: 5,
			label: '2:3',
		},
		{
			position: 6,
			label: '3:1',
		},
		{
			position: 7,
			label: '3:2',
		},
		{
			position: 8,
			label: '3:3',
		},
		{
			position: 9,
			label: '4:1',
		},
		{
			position: 10,
			label: '4:2',
		},
		{
			position: 11,
			label: '4:3',
		},
		{
			position: 12,
			label: '5:1',
		},
		{
			position: 13,
			label: '5:2',
		},
		{
			position: 14,
			label: '5:3',
		},
		{
			position: 15,
			label: '6:1',
		},
		{
			position: 16,
			label: '6:2',
		},
		{
			position: 17,
			label: '6:3',
		},
		{
			position: 18,
			label: '7:1',
		},
		{
			position: 19,
			label: '7:2',
		},
		{
			position: 20,
			label: '7:3',
		},
	];
}
