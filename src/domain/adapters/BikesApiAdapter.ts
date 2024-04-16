import Filter from "../entities/Filter";
import AxiosAdapter from "./AxiosAdapter";


export default class BikesApiAdapter {
	filters: Array<Filter> = [];
	baseUrl: string;
	httpClient: AxiosAdapter;
	defaultDatabaseId: string;
	constructor () {
		this.baseUrl = "http://localhost:3030";
		this.defaultDatabaseId = "f5574781ad2e4d5e85990658c3803c5c";
		this.httpClient = new AxiosAdapter();
	}

	async getFilters(): Promise<any[]> {
		const response = await this.httpClient.get(`${this.baseUrl}/filters/${this.defaultDatabaseId}`);
		return response;
	}
	

	async getBikeStations(filters: any): Promise<any[]> {

		// filters create query
		const response = await this.httpClient.get(`${this.baseUrl}/stations/${this.defaultDatabaseId}${filters}`);
		return response;
	}
}