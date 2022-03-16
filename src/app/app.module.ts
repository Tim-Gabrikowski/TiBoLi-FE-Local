//imports of stuff:
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//modules:
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AppRoutingModule } from './app-routing.module';
//components:
import { MessageComponent } from './message/message.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
//materials:
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
	declarations: [AppComponent, HomeComponent, MessageComponent],
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
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
