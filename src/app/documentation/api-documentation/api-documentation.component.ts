import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface chapter {
	id: number;
	title: string;
	filename: string;
}

@Component({
	selector: 'app-api-documentation',
	templateUrl: './api-documentation.component.html',
	styleUrls: ['./api-documentation.component.css'],
})
export class APIDocumentationComponent implements OnInit {
	constructor(private router: Router, private http: HttpClient) {}

	chapters?: chapter[];

	ngOnInit() {
		this.getAllChapters().subscribe((result) => (this.chapters = result));
	}

	getAllChapters(): Observable<chapter[]> {
		return this.http.get<chapter[]>('api/settings/documentation');
	}

	backToHome() {
		this.router.navigate(['documentation']);
	}
}
