import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookWishService } from '../service/book-wish.service';

@Component({
	selector: 'app-wish-form',
	templateUrl: './wish-form.component.html',
	styleUrls: ['./wish-form.component.css'],
})
export class WishFormComponent implements OnInit {
	constructor(private wishService: BookWishService, private router: Router) {}

	ngOnInit(): void {}
	loading: boolean = false;

	sendWish(title: string, author: string, hint: string) {
		if (this.loading) return;
		this.loading = true;
		var wish = {
			title: title,
			author: author,
			hint: hint,
		};
		this.wishService.postWish(wish).subscribe((result) => {
			this.loading = false;
			window.location.reload();
		});
	}
}
