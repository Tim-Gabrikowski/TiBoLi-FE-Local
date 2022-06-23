import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClass } from 'src/app/interfaces/class';
import { ClassesService } from '../services/classes.service';

@Component({
	selector: 'app-classes',
	templateUrl: './classes.component.html',
	styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit {
	constructor(private router: Router, private classService: ClassesService) {}

	editorOpen: boolean = false;

	classes: IClass[] = [];
	classIdToEdit: number = 0;
	classToEdit?: IClass;
	displayedColumns: string[] = ['id', 'class'];
	savingClass: boolean = false;
	edit: boolean = true;
	emptyClass: IClass = {
		id: 0,
		year: 0,
		letter: '',
	};
	ngOnInit(): void {
		this.getClasses();
	}
	backToHome() {
		this.router.navigate(['']);
	}
	getClasses() {
		this.classService.getClasses().subscribe((classes: IClass[]) => {
			this.classes = classes;
		});
	}
	openNewEditor() {
		this.edit = false;
		this.classToEdit = this.emptyClass;
		this.editorOpen = true;
	}
	onSelectClass(id: number) {
		this.classIdToEdit = id;
		this.edit = true;
		this.updateEditor();
	}
	updateEditor() {
		this.editorOpen = false;
		var index = this.classes.findIndex(
			(elem) => elem.id === this.classIdToEdit
		);
		this.classToEdit = this.classes[index];
		this.editorOpen = true;
	}
	updateClass(year: string, letter: string) {
		if (this.edit) {
			var updateClass = {
				id: this.classIdToEdit,
				year: Number(year),
				letter: letter,
			};
			this.savingClass = true;
			this.classService.updateClass(updateClass).subscribe((_) => {
				this.classService.log('Klasse gespeichert');
				this.savingClass = false;
				window.location.reload();
			});
		} else {
			var newClass = {
				id: 0,
				year: Number(year),
				letter: letter,
			};
			this.savingClass = true;
			this.classService.createNewClass(newClass).subscribe((_) => {
				this.classService.log('Klasse gespeichert');
				this.savingClass = false;
				window.location.reload();
			});
		}
	}
}
