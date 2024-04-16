import BikesApiAdapter from "../adapters/BikesApiAdapter";

export default class GetBikeStations {
	api: BikesApiAdapter

	constructor() {
		this.api = new BikesApiAdapter();
	}

	async execute(filters: any)
	{
		const bikeStations = await this.api.getBikeStations(filters);
		return bikeStations;
	}
}