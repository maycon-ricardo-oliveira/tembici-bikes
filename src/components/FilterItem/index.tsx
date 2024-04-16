import React from "react";
import style from './FilterItem.module.scss';


interface Props {
	type?: "button" | "submit" | "reset" | undefined,
	onClick?: () => void,
	children?: React.ReactNode
}

function FilterItem({onClick, children, type}: Props) {

		return (
			<button className={style.button} type={type} onClick={onClick}>
				{children}
			</button>
		)
}

export default FilterItem;