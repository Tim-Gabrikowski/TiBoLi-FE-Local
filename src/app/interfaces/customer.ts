import { IClass } from './class';

export interface ICustomer {
	id: number;
	name: string;
	lastname: string;
	classId: number;
	class?: IClass;
}
