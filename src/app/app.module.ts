//imports of stuff:
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from './pipes/dateManagement/date.pipe';
import { FormatDatePipe } from './pipes/dateManagement/format-date.pipe';
import { TransactionStatusPipe } from './pipes/transaction-status.pipe';
//modules:
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AppRoutingModule } from './app-routing.module';
//components:
import { MessageComponent } from './message/message.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LentComponent } from './transactions/lent/lent.component';
import { BackComponent } from './transactions/back/back.component';
import { TransactionsComponent } from './transactions/transactions.component';
//materials:
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { UnixToDateStringPipe } from './pipes/dateManagement/unix-to-date-string.pipe';

@NgModule({
	declarations: [
		//components:
		AppComponent,
		HomeComponent,
		MessageComponent,
		TransactionsComponent,
		LentComponent,
		BackComponent,
		//pipes:
		DatePipe,
		FormatDatePipe,
		TransactionStatusPipe,
  UnixToDateStringPipe,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BooksModule,
		UsersModule,
		HttpClientModule,
		FormsModule,
		BrowserAnimationsModule,

		//materials:
		MatToolbarModule,
		MatSnackBarModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatDividerModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatStepperModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
