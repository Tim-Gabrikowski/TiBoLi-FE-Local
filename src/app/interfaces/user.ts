import { IClass } from './class';

export interface IUser {
	id: number;
	vorname: string;
	nachname: string;
	classId: number;
	class?: IClass;
}
