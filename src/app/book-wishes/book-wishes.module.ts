import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookWishesComponent } from './book-wishes/book-wishes.component';

//materials:
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WishFormComponent } from './wish-form/wish-form.component';

@NgModule({
	declarations: [BookWishesComponent, WishFormComponent],
	imports: [
		CommonModule,
		MatIconModule,
		MatDividerModule,
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatTooltipModule,
		MatProgressBarModule,
	],
	exports: [BookWishesComponent],
})
export class BookWishesModule {}
