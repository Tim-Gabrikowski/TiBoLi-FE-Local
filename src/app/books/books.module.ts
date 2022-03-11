import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookInformationComponent } from './book-detail/book-information/book-information.component';
import { BookCopiesComponent } from './book-detail/book-copies/book-copies.component';
import { BookEditComponent } from './book-detail/book-edit/book-edit.component';
import { BookListItemComponent } from './books-list/book-list-item/book-list-item.component';
//materials
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
	declarations: [
		BooksListComponent,
		BookDetailComponent,
		BookInformationComponent,
		BookCopiesComponent,
		BookEditComponent,
		BookListItemComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		//materials
		MatTabsModule,
		MatCardModule,
		MatListModule,
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatTooltipModule,
		MatProgressBarModule,
	],
	exports: [BooksListComponent, BookDetailComponent],
})
export class BooksModule {}
