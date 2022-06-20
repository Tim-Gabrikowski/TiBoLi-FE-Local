import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IWhish } from 'src/app/interfaces/whish';
import { BookWhishService } from '../service/book-whish.service';

@Component({
	selector: 'app-book-whishes',
	templateUrl: './book-whishes.component.html',
	styleUrls: ['./book-whishes.component.css'],
})
export class BookWhishesComponent implements OnInit {
	constructor(
		private router: Router,
		private whishService: BookWhishService
	) {}
	whishes: IWhish[] = [];
	loading: boolean = true;
	showForm: boolean = false;

	ngOnInit(): void {
		this.getAllWhishes();
	}
	backToHome() {
		this.router.navigate(['']);
	}
	getAllWhishes() {
		this.whishService.getWhishes().subscribe((whishes) => {
			this.whishes = whishes;
			this.loading = false;
		});
	}
	toggleForm() {
		this.showForm = !this.showForm;
	}
}
