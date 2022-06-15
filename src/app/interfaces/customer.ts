import { IClass } from './class';
import { IUser } from './user';

export interface ICustomer {
	id: number;
	name: string;
	lastname: string;
	classId: number;
	class?: IClass;
	user?: IUser;
}
