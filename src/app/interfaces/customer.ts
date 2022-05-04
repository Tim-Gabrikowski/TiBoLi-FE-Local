import { IClass } from './class';

export interface ICustomer {
	id: number;
	vorname: string;
	nachname: string;
	classId: number;
	class?: IClass;
}
