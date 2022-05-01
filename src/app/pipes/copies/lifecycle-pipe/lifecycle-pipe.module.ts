import { NgModule } from '@angular/core';

import { LifecyclePipe } from './lifecycle.pipe';

@NgModule({
	imports: [],
	declarations: [LifecyclePipe],
	exports: [LifecyclePipe],
})
export class LifecyclePipeModule {
	static forRoot() {
		return {
			ngModule: LifecyclePipeModule,
			providers: [],
		};
	}
}
