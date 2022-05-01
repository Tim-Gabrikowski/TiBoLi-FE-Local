import { Component, Input, OnInit } from '@angular/core';
import { IBook } from 'src/app/interfaces/book';
import { ICopy } from 'src/app/interfaces/copy';
import { PdfService } from 'src/app/pdf.service';
import { BookService } from '../../services/book.service';

@Component({
	selector: 'app-book-copies',
	templateUrl: './book-copies.component.html',
	styleUrls: ['./book-copies.component.css'],
})
export class BookCopiesComponent implements OnInit {
	constructor(
		private bookService: BookService,
		private pdfService: PdfService
	) {}

	@Input() book?: IBook;
	newCopy: boolean = false;
	ngOnInit(): void {}
	createCopy() {
		this.newCopy = true;
		this.bookService.createCopies(this.book!.id, 1).subscribe((copies) => {
			copies.forEach((element) => {
				this.book!.copies!.push(element);
			});

			this.newCopy = false;
		});
	}
	deleteCopy(mNumber: number | Number) {
		this.bookService.deleteCopy(mNumber);
		var index: number | undefined = this.book!.copies?.findIndex(
			(item) => item.mNumber === mNumber
		);
		if (!(index === undefined)) {
			this.book!.copies![index].lifecycle = 5;
		}
		this.book!.copies = this.book!.copies?.filter(
			(copy) => copy.lifecycle != 5
		);
	}

	printCopies: ICopy[] = [];
	loadLables: boolean = false;
	addToPrint(mNumber: Number, copyID: Number, lifecycle: Number) {
		var copy = {
			mNumber: mNumber,
			copyId: copyID,
			lifecycle: lifecycle,
			bookId: this.book!.id,
		};
		this.printCopies.push(copy);
		console.log('print: ', copy);
	}
	removeFromPrint(mNumber: Number) {
		this.printCopies = this.printCopies.filter((e) => e.mNumber != mNumber);
	}
	isCopyForPrint(mNumber: Number) {
		if (this.printCopies.filter((e) => e.mNumber == mNumber).length > 0) {
			return true;
		} else {
			return false;
		}
	}
	getPdfOfBooks(startAt: string) {
		var body = {
			startAt: Number(startAt),
			books: [{}],
		};

		var books = [{}];
		this.printCopies.forEach((element) => {
			var book = {
				title: this.book!.title,
				author: this.book!.author,
				mNumber: element.mNumber,
			};
			books.push(book);
		});

		body.books = books;
		body.books.shift();
		console.log(body);
		this.loadLables = true;
		this.pdfService.downloadPDF(body, () => {
			this.loadLables = false;
			this.printCopies = [];
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
