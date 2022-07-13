import { ICustomer } from './customer';

export interface IUser {
	id: number;
	username: String;
	perm_group: number;
	customerId: number;
	customer?: ICustomer;
}
