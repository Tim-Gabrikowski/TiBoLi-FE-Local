import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerListItemComponent } from './customers-list/customer-list-item/customer-list-item.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerInformationComponent } from './customer-detail/customer-information/customer-information.component';
import { CutomerEditComponent } from './customer-detail/customer-edit/customer-edit.component';
import { CustomerNewEditorComponent } from './customers-list/customer-new-editor/customer-new-editor.component';
import { CustomerTransactionsComponent } from './customer-detail/customer-transactions/customer-transactions.component';
import { PipesModuleModule } from '../pipes-module/pipes-module.module';
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
import { MatTableModule } from '@angular/material/table';
import { AppModule } from '../app.module';
import { PermGroupPipeModule } from '../pipes/perm-group-pipe/perm-group-pipe.module';
import { ClassesComponent } from './classes/classes.component';

@NgModule({
	declarations: [
		CustomersListComponent,
		CustomerListItemComponent,
		CustomerDetailComponent,
		CustomerInformationComponent,
		CutomerEditComponent,
		CustomerNewEditorComponent,
		CustomerTransactionsComponent,
		ClassesComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		PipesModuleModule,
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
		MatTableModule,
		PermGroupPipeModule,
	],
	exports: [CustomersListComponent],
})
export class CustomersModule {}
