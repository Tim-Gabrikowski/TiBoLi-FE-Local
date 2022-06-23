import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { BooksListComponent } from './books/books-list/books-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { HomeComponent } from './home/home.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { LentComponent } from './transactions/lent/lent.component';
import { BackComponent } from './transactions/back/back.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { APIDocumentationComponent } from './documentation/api-documentation/api-documentation.component';
import { BookWhishesComponent } from './book-whishes/book-whishes/book-whishes.component';
import { ClassesComponent } from './customers/classes/classes.component';

const routes: Routes = [
	{ path: 'books', component: BooksListComponent },
	{ path: 'books/:id', component: BookDetailComponent },
	{ path: 'books/:id/:page', component: BookDetailComponent },
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'customers', component: CustomersListComponent },
	{ path: 'customers/:bNumber', component: CustomerDetailComponent },
	{ path: 'customers/:bNumber/:page', component: CustomerDetailComponent },
	{ path: 'transactions', component: TransactionsComponent },
	{ path: 'transactions/lent/:random', component: LentComponent },
	{ path: 'transactions/back', component: BackComponent },
	{ path: 'documentation', component: DocumentationComponent },
	{ path: 'documentation/api', component: APIDocumentationComponent },
	{ path: 'whish', component: BookWhishesComponent },
	{ path: 'classes', component: ClassesComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
