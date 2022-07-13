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
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminUserListComponent } from './admin/user-list/user-list.component';
import { AdminUserDetailComponent } from './admin/user-detail/user-detail.component';

const routes: Routes = [
	{
		path: 'books',
		component: BooksListComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 0 },
	},
	{
		path: 'books/:id',
		component: BookDetailComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 0 },
	},
	{
		path: 'books/:id/:page',
		component: BookDetailComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 0 },
	},
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{
		path: 'customers',
		component: CustomersListComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 3 },
	},
	{
		path: 'customers/:bNumber',
		component: CustomerDetailComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 3 },
	},
	{
		path: 'customers/:bNumber/:page',
		component: CustomerDetailComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 3 },
	},
	{
		path: 'transactions',
		component: TransactionsComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 3 },
	},
	{
		path: 'transactions/lent/:random',
		component: LentComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 3 },
	},
	{
		path: 'transactions/back',
		component: BackComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 3 },
	},
	{
		path: 'whish',
		component: BookWhishesComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 0 },
	},
	{
		path: 'classes',
		component: ClassesComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 3 },
	},
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 4 },
	},
	{
		path: 'admin/users',
		component: AdminUserListComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 4 },
	},
	{
		path: 'admin/users/:id',
		component: AdminUserDetailComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 4 },
	},
	{
		path: 'admin/users/:id/:page',
		component: AdminUserDetailComponent,
		canActivate: [AuthGuard],
		data: { perm_group: 4 },
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthGuard],
})
export class AppRoutingModule {}
