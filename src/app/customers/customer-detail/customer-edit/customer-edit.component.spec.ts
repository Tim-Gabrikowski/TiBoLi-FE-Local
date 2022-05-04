import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomerEditComponent } from './customer-edit.component';

describe('CutomerEditComponent', () => {
	let component: CutomerEditComponent;
	let fixture: ComponentFixture<CutomerEditComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CutomerEditComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CutomerEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
