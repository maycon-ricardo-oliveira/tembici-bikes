import BikesApiAdapter from "../adapters/BikesApiAdapter";
import FilterOption from "../entities/FilterOption";
import SelectedOption from "../entities/SelectedOption";

export default class Storage {
	
	constructor(
		readonly filterKey: string = "filtersSelected"
	) {
		
	}

	async setFilterStorage(filter: SelectedOption): Promise<void> {
		const currentFiltersJSON = localStorage.getItem(this.filterKey);
	
		if (!currentFiltersJSON) {
			localStorage.setItem(this.filterKey, JSON.stringify([filter]));
			return;
		}
	
		const currentFilters: SelectedOption[] = JSON.parse(currentFiltersJSON);
		const existingFilterIndex = currentFilters.findIndex((f) => f.queryName === filter.queryName);
	
		if (existingFilterIndex !== -1) {
			currentFilters[existingFilterIndex].value = filter.value;
		} else {
			currentFilters.push(filter);
		}
	
		localStorage.setItem(this.filterKey, JSON.stringify(currentFilters));
	};

	async getFilterStorage(): Promise<SelectedOption[]>
	{
		const currentFilters = localStorage.getItem(this.filterKey);

		if (currentFilters == null || currentFilters === undefined) {
			return [];
		}
		const response: SelectedOption[] = JSON.parse(currentFilters);
		return response;
	}
}