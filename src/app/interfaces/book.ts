import { ICopy } from './copy';

export interface IBook {
	id: Number;
	title: string;
	subtitle: string;
	author: string;
	publisher: string;
	year: string;
	age: string;
	isbn: string;
	copies?: ICopy[];
}
