import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ path: 'books', component: BooksListComponent },
	{ path: 'books/:id', component: BookDetailComponent },
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
