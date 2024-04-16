export default class SelectedOption {
	queryName: any;
	value: any;
	constructor (
		queryName: string,
		value: string
	) {
		this.queryName = queryName;
		this.value = value;
	}
}