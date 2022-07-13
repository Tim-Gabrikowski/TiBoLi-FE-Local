import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MatTabGroup, MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { Location } from '@angular/common';
import { IUser } from 'src/app/interfaces/user';

@Component({
	selector: 'app-user-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.css'],
})
export class AdminUserDetailComponent implements OnInit {
	constructor(
		private adminService: AdminService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	userId?: number;
	page: string = 'overview';
	pageIndex: number = 0;
	user?: IUser;

	tabs: string[] = ['overview', 'edit'];
	@ViewChild('tabGroup', { static: false }) tabGroup?: MatTabGroup;

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.userId = Number(params.id);
			this.getUser(this.userId);

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

	getUser(id: number) {
		this.adminService.getUser(id).subscribe((user) => {
			this.user = user;
		});
	}

	backToList() {
		this.router.navigate(['admin/users']);
	}
	selectTab(index: number) {
		this.setPageUrl(index);
		const tabGroup = this.tabGroup;
		if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;

		tabGroup.selectedIndex = index;
	}
	setPageUrl(index: number) {
		this.location.go(
			'/admin/users/' + this.userId! + '/' + this.tabs[index]
		);
	}
	selectedTabChange(event: MatTabChangeEvent) {
		this.setPageUrl(event.index);
	}
	onEvent(event: string) {
		switch (event) {
			case 'reload':
				this.getUser(this.user!.id);
				break;
			case 'fullreload':
				this.getUser(this.user!.id);
				this.selectTab(0);
				break;
			case 'backToList':
				this.backToList();
				break;
		}
	}
}
