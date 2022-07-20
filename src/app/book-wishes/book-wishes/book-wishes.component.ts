import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IWish } from 'src/app/interfaces/wish';
import { BookWishService } from '../service/book-wish.service';

@Component({
	selector: 'app-book-wishes',
	templateUrl: './book-wishes.component.html',
	styleUrls: ['./book-wishes.component.css'],
})
export class BookWishesComponent implements OnInit {
	constructor(private router: Router, private wishService: BookWishService) {}
	wishes: IWish[] = [];
	loading: boolean = true;
	showForm: boolean = false;

	ngOnInit(): void {
		this.getAllWishes();
	}
	backToHome() {
		this.router.navigate(['']);
	}
	getAllWishes() {
		this.wishService.getWishes().subscribe((wishes) => {
			this.wishes = wishes;
			this.loading = false;
		});
	}
	toggleForm() {
		this.showForm = !this.showForm;
	}
}
