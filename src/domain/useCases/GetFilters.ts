import BikesApiAdapter from "../adapters/BikesApiAdapter";

export default class GetFilters {
	api: BikesApiAdapter

	constructor() {
		this.api = new BikesApiAdapter();
	}

	async execute(databaseId: string)
	{
		const filters = await this.api.getFilters();
		return filters;
	}
}