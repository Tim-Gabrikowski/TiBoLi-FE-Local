import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNewEditorComponent } from './customer-new-editor.component';

describe('CustomerNewEditorComponent', () => {
	let component: CustomerNewEditorComponent;
	let fixture: ComponentFixture<CustomerNewEditorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CustomerNewEditorComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CustomerNewEditorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
