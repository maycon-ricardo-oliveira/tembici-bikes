import React from "react";
import style from './Button.module.scss';


interface Props {
	type?: "button" | "submit" | "reset" | undefined,
	onClick?: () => void,
	children?: React.ReactNode
}

function Button({onClick, children, type}: Props) {

		return (
			<button className={style.button} type={type} onClick={onClick}>
				{children}
			</button>
		)
}

export default Button;