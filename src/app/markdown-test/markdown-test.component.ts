import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

@Component({
	selector: 'app-markdown-display',
	templateUrl: './markdown-test.component.html',
	styleUrls: ['./markdown-test.component.css'],
})
export class MarkdownTestComponent implements OnInit {
	markdown: string | undefined;
	constructor(private mdService: MarkdownService, private http: HttpClient) {}

	async ngOnInit() {
		const markdownRaw = await this.http
			.get('api/settings/documentation', { responseType: 'text' })
			.toPromise();
		this.markdown = this.mdService.compile(markdownRaw);
	}
}
