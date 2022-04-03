import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnixToDateStringPipe } from '../pipes/dateManagement/unix-to-date-string.pipe';

@NgModule({
	declarations: [UnixToDateStringPipe],
	imports: [CommonModule],
	exports: [UnixToDateStringPipe],
})
export class PipesModuleModule {}
