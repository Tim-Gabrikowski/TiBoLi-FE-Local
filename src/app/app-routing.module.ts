import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

const routes: Routes = [
	{ path: 'books', component: BooksListComponent },
	{ path: 'books/:id', component: BookDetailComponent },
	{ path: 'books/:id/:page', component: BookDetailComponent },
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'users', component: UsersListComponent },
	{ path: 'users/:bNumber', component: UserDetailComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
