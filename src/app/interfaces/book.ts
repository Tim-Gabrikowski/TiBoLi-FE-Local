import { ICopy } from './copy';

export interface IBook {
	id: Number;
	title: string;
	author: string;
	copies?: ICopy[];
}
