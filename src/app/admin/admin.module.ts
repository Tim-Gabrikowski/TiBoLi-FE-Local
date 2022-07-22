import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PermGroupPipeModule } from '../pipes/perm-group-pipe/perm-group-pipe.module';
import { AdminComponent } from './admin.component';
import { AdminUserListComponent } from './user-list/user-list.component';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserListItemComponent } from './user-list/user-list-item/user-list-item.component';
import { AdminUserDetailComponent } from './user-detail/user-detail.component';
import { UserInformationComponent } from './user-detail/user-information/user-information.component';
import { UserEditComponent } from './user-detail/user-edit/user-edit.component';
import { UserNewEditorComponent } from './user-list/user-new-editor/user-new-editor.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
	declarations: [
		AdminComponent,
		AdminUserListComponent,
		UserListItemComponent,
		AdminUserDetailComponent,
		UserInformationComponent,
		UserEditComponent,
  UserNewEditorComponent,
  SettingsComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		//materials
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
		PermGroupPipeModule,
	],
	exports: [AdminComponent, AdminUserListComponent, AdminUserDetailComponent],
})
export class AdminModule {}
