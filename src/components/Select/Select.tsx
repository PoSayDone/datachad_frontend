import React from 'react';

import style from '../Button/Button.module.scss';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../Popover/Popover';

type Option = {
	value: string;
	label: string;
};

interface SelectProps {
	options: Option[];
	value: string;
	onChange: (value: any) => void;
	className: string;
	variant?: 'sm' | 'md';
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, ...props }) => {
	return (
		<>
			<Popover>
				<PopoverTrigger asChild={true}>
					<button
						className={`${style.button} ${style.select} ${style[props.variant || '']} ${
							props.className
						}`}
					>
						{options.find((option) => option.value === value)?.label}
						<span className='material-symbols-outlined'>expand_more</span>
					</button>
				</PopoverTrigger>
				<PopoverContent>
					{options.map((option, index) => (
						<PopoverClose
							className={style.item}
							key={index}
							onClick={() => onChange(option.value)}
						>
							{option.label}
						</PopoverClose>
					))}
				</PopoverContent>
			</Popover>
		</>
	);
};

export default Select;
