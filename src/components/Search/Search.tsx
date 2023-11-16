import { HTMLAttributes } from 'react';

import style from './Search.module.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
	placeholder: string;
	value: string;
	onChange: any;
};

const Search = ({ placeholder, value, onChange, className, ...props }: Props) => {
	return (
		<div className={`${style.wrapper}  ${className}`}>
			<span className={`material-symbols-rounded ${style.icon}`}>search</span>
			<input
				className={style.input}
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				{...props}
			/>
		</div>
	);
};

export default Search;
