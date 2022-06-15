import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IClass } from 'src/app/interfaces/class';
import { ICustomer } from 'src/app/interfaces/customer';
import { MessageService } from 'src/app/message.service';
import { PdfService } from 'src/app/pdf.service';
import { CustomersService } from '../../services/customers.service';

@Component({
	selector: 'app-customer-edit',
	templateUrl: './customer-edit.component.html',
	styleUrls: ['./customer-edit.component.css'],
})
export class CutomerEditComponent implements OnInit {
	constructor(
		private customerService: CustomersService,
		private router: Router,
		private pdfService: PdfService,
		private messageService: MessageService,
		private authService: AuthService
	) {}

	log(msg: string) {
		this.messageService.add(msg);
	}
	@Input() customer?: ICustomer;
	ngOnInit(): void {
		this.getClasses();
	}

	classes: IClass[] = [];
	hide: boolean = true;

	getClasses() {
		this.customerService.getClasses().subscribe((classes) => {
			this.classes = classes;
		});
	}
	registerNewUser(username: string, password: string, perm_group: number) {
		console.log(username, password, perm_group);
		this.log('neuer Nutzer: ' + username + ' wird erstellt');
		this.authService
			.register(username, password, perm_group, this.customer!.id)
			.subscribe((data) => {
				console.log(data);
				this.router.navigate([
					'/customers/' + this.customer!.id + '/overview',
				]);
			});
	}

	onSubmit(name: string, lastname: string, classId: number) {
		this.customer!.name = name;
		this.customer!.lastname = lastname;
		this.customer!.classId = classId;
		this.customerService.editCustomer(this.customer!);
		this.router.navigate(['/customers/' + this.customer!.id + '/overview']);
	}
	deleteCustomer() {
		this.customerService.deleteCustomer(this.customer!.id);
		this.router.navigate(['customers']);
	}
	loadLables: boolean = false;
	getPdfOfCustomers(startAt: string) {
		this.log('Karte wird geladen, bitte warten');
		var body = {
			startAt: Number(startAt),
			customers: [this.customer!],
		};
		console.log(body);
		this.loadLables = true;
		this.pdfService.downloadCustomerPDF(body, () => {
			this.loadLables = false;
		});
	}
	defaultPerm = 1;
	permGroups = [0, 1, 2, 3, 4];

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
