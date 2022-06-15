import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermGroupPipe } from './perm-group.pipe';

@NgModule({
	declarations: [PermGroupPipe],
	imports: [CommonModule],
	exports: [PermGroupPipe],
})
export class PermGroupPipeModule {}
