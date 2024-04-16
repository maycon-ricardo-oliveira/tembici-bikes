import React, { useState } from "react";
import style from './FilterItemSelect.module.scss';
import Filter from "../../domain/entities/Filter";
import FilterOption from "../../domain/entities/FilterOption";
import Storage from "../../domain/useCases/Storage";
import { prop } from "cheerio/lib/api/attributes";
import SelectedOption from "../../domain/entities/SelectedOption";


interface Props {
	filter: Filter,
	// type?: "button" | "submit" | "reset" | undefined,
	children?: React.ReactNode
}

function FilterItemSelect(props: Props) {

	const [selected, setSelected] = useState<string>();

	const handleChange = async (e: any) => {
    setSelected(e.target.value);

		const option = new SelectedOption(props.filter.queryName, e.target.value);
		const storage = new Storage();
		await storage.setFilterStorage(option);

		console.log("response: ", option)
  }


	return (
		
		<div>
			<select 
				value={selected} 
				onChange={handleChange} 
				className={style.button}
			>
				{
					props.filter.options.map((item: FilterOption) => (
						<option value={item.name}>{item.name}</option>
					))
				}
			</select>
		</div>
	);
}

export default FilterItemSelect;
