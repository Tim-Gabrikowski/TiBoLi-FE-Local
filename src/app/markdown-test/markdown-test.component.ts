import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

@Component({
	selector: 'app-markdown-display',
	templateUrl: './markdown-test.component.html',
	styleUrls: ['./markdown-test.component.css'],
})
export class MarkdownTestComponent implements OnInit {
	markdown: string | undefined;
	@Input() id?: number;

	constructor(private mdService: MarkdownService, private http: HttpClient) {}

	async ngOnInit() {
		const markdownRaw = await this.http
			.get('api/settings/documentation/chapter/' + this.id!, {
				responseType: 'text',
			})
			.toPromise();
		this.markdown = this.mdService.compile(markdownRaw);
	}
}
