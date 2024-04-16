import FilterOption from "./FilterOption";

 export default class Filter {
	readonly name: string;
	readonly queryName: string;
	readonly type: string;
	options: Array<FilterOption> = []

	constructor(name: string, queryName: string, type: string, options:Array<FilterOption>) {
		this.name = name;
		this.queryName = queryName;
		this.type = type;
		this.options = options;
	}

}