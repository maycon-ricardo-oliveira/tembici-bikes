import React, { useState } from "react";
import style from './Filters.module.scss';
import Filter from "../../domain/entities/Filter";
import FilterOption from "../../domain/entities/FilterOption";
import FilterItemSelect from "../FilterItemSelect";


interface Props {
	filters: Filter[],
	// type?: "button" | "submit" | "reset" | undefined,
	children?: React.ReactNode
}

function Filters(props: Props) {


	return (
		<div className={style.container}>
				{
					props.filters.map((item: Filter) => (
						<FilterItemSelect filter={item} key={item.name}/>
					))
				}
		</div>
	);
}

export default Filters;