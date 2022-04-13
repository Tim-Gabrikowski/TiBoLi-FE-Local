import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { BooksListComponent } from './books/books-list/books-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { LentComponent } from './transactions/lent/lent.component';
import { BackComponent } from './transactions/back/back.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { APIDocumentationComponent } from './documentation/api-documentation/api-documentation.component';

const routes: Routes = [
	{ path: 'books', component: BooksListComponent },
	{ path: 'books/:id', component: BookDetailComponent },
	{ path: 'books/:id/:page', component: BookDetailComponent },
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'users', component: UsersListComponent },
	{ path: 'users/:bNumber', component: UserDetailComponent },
	{ path: 'users/:bNumber/:page', component: UserDetailComponent },
	{ path: 'transactions', component: TransactionsComponent },
	{ path: 'transactions/lent/:random', component: LentComponent },
	{ path: 'transactions/back', component: BackComponent },
	{ path: 'documentation', component: DocumentationComponent },
	{ path: 'documentation/api', component: APIDocumentationComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
