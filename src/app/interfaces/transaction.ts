export interface ITransaction {
	id: number;
	bNumber: number;
	mNumber: number;
	lentDate: number;
	backDate: number | null;
	maxBack: number;
}
