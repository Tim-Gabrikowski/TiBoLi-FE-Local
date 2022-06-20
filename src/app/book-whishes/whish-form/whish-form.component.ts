import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookWhishService } from '../service/book-whish.service';

@Component({
	selector: 'app-whish-form',
	templateUrl: './whish-form.component.html',
	styleUrls: ['./whish-form.component.css'],
})
export class WhishFormComponent implements OnInit {
	constructor(
		private whishService: BookWhishService,
		private router: Router
	) {}

	ngOnInit(): void {}
	loading: boolean = false;

	sendWhish(title: string, author: string, hint: string) {
		if (this.loading) return;
		this.loading = true;
		var whish = {
			title: title,
			author: author,
			hint: hint,
		};
		this.whishService.postWhish(whish).subscribe((result) => {
			this.loading = false;
			window.location.reload();
		});
	}
}
