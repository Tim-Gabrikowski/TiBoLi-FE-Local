import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookWhishesComponent } from './book-whishes/book-whishes.component';

//materials:
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WhishFormComponent } from './whish-form/whish-form.component';

@NgModule({
	declarations: [BookWhishesComponent, WhishFormComponent],
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
	exports: [BookWhishesComponent],
})
export class BookWhishesModule {}
