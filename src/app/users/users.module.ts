import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UserListItemComponent } from './users-list/user-list-item/user-list-item.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserInformationComponent } from './user-detail/user-information/user-information.component';
import { UserEditComponent } from './user-detail/user-edit/user-edit.component';
import { UserNewEditorComponent } from './users-list/user-new-editor/user-new-editor.component';
//Material:
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
	declarations: [
		UsersListComponent,
		UserListItemComponent,
		UserDetailComponent,
		UserInformationComponent,
		UserEditComponent,
		UserNewEditorComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		//Materials:
		MatTabsModule,
		MatCardModule,
		MatListModule,
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatTooltipModule,
		MatProgressBarModule,
		MatStepperModule,
		MatSelectModule,
	],
	exports: [UsersListComponent],
})
export class UsersModule {}
