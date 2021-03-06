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
import { CustomersModule } from './customers/customers.module';
import { AppRoutingModule } from './app-routing.module';
import { MarkdownModule } from 'ngx-markdown';
import { BookWishesModule } from './book-wishes/book-wishes.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';

//components:
import { MessageComponent } from './message/message.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LentComponent } from './transactions/lent/lent.component';
import { BackComponent } from './transactions/back/back.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { MarkdownTestComponent } from './markdown-test/markdown-test.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { APIDocumentationComponent } from './documentation/api-documentation/api-documentation.component';
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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { authInterceptorProviders } from './auth/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { PermGroupPipeModule } from './pipes/perm-group-pipe/perm-group-pipe.module';
import { PipesModuleModule } from './pipes-module/pipes-module.module';
import { ExtendComponent } from './transactions/extend/extend.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
	declarations: [
		//components:
		AppComponent,
		HomeComponent,
		MessageComponent,
		TransactionsComponent,
		LentComponent,
		BackComponent,
		MarkdownTestComponent,
		DocumentationComponent,
		APIDocumentationComponent,
		LoginComponent,
		//pipes:
		DatePipe,
		FormatDatePipe,
		TransactionStatusPipe,
		ExtendComponent,
	],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule,
		BooksModule,
		CustomersModule,
		AdminModule,
		BookWishesModule,
		HttpClientModule,
		FormsModule,
		BrowserAnimationsModule,
		MarkdownModule.forRoot(),

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
		MatExpansionModule,
		MatProgressBarModule,
		PermGroupPipeModule,
		PipesModuleModule,
		MatAutocompleteModule,
	],
	providers: [authInterceptorProviders],
	bootstrap: [AppComponent],
})
export class AppModule {}
